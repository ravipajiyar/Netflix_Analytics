import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  CalendarRange,
  Frown,
  Meh,
  MessageCircle,
  Smile,
  Star,
  ThumbsUp,
} from 'lucide-react';
import { fetchSentimentAnalysis } from '../api';
import BarChart from '../components/BarChart';
import ChartCard from '../components/ChartCard';
import FilterSelect from '../components/FilterSelect';
import LineChart from '../components/LineChart';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import ProgressList from '../components/ProgressList';
import StatCard from '../components/StatCard';
import { formatNumber, formatPercent } from '../utils';

const sentimentMeta = {
  Positive: { icon: Smile, tone: 'emerald', color: '#34d399' },
  Neutral: { icon: Meh, tone: 'amber', color: '#f59e0b' },
  Negative: { icon: Frown, tone: 'red', color: '#fb7185' },
};

const mockFeedbackThemes = [
  { Theme: 'Content quality', Sentiment: '92% Positive' },
  { Theme: 'Streaming quality', Sentiment: '88% Positive' },
  { Theme: 'User interface', Sentiment: '85% Positive' },
];

const mockSentimentByGenre = [
  { Genre: 'Drama', Score: '4.5/5.0' },
  { Genre: 'Comedy', Score: '4.2/5.0' },
  { Genre: 'Action', Score: '4.0/5.0' },
];

const mockResponseActions = {
  resolved: 892,
  inProgress: 234,
};

const mockSocialMediaImpactData = [
  { Platform: 'Twitter mentions', Count: '2.3M', color: '#1d9bf0' },
  { Platform: 'Instagram followers', Count: '5.1M', color: '#f56040' },
  { Platform: 'YouTube views', Count: '12.7M', color: '#ff0000' },
];

const SentimentAnalysis = () => {
  const [sentimentData, setSentimentData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchSentimentAnalysis();
        if (active) setSentimentData(response ?? []);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const years = useMemo(
    () =>
      [...new Set(sentimentData.map((item) => item['Release Year']))].sort(
        (a, b) => Number(b) - Number(a)
      ),
    [sentimentData]
  );

  const yearOptions = useMemo(
    () => [
      { value: 'all', label: 'All years' },
      ...years.map((year) => ({ value: String(year), label: String(year) })),
    ],
    [years]
  );

  const filteredData = useMemo(
    () =>
      selectedYear === 'all'
        ? sentimentData
        : sentimentData.filter((item) => item['Release Year'] === Number(selectedYear)),
    [sentimentData, selectedYear]
  );

  const stats = useMemo(() => {
    const totals = filteredData.reduce((acc, item) => {
      const sentiment = item.Sentiment || 'Neutral';
      acc[sentiment] = (acc[sentiment] || 0) + (Number(item['Total Count']) || 0);
      return acc;
    }, {});

    const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
    const rows = ['Positive', 'Neutral', 'Negative']
      .filter((sentiment) => totals[sentiment])
      .map((sentiment) => ({
        Sentiment: sentiment,
        Count: totals[sentiment],
        Share: total ? Number(((totals[sentiment] / total) * 100).toFixed(1)) : 0,
      }));

    return { totals, total, rows };
  }, [filteredData]);

  const indicatorItems = [
    { label: 'User satisfaction', value: 84, display: '4.2/5.0', color: '#34d399' },
    { label: 'Recommendation rate', value: 85, display: '85%', color: '#22d3ee' },
    { label: 'Engagement score', value: 78, display: '78%', color: '#a78bfa' },
    { label: 'Response rate', value: 92, display: '92%', color: '#e50914' },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Audience"
        title="Sentiment analysis"
        description="Measure how audiences feel about Netflix content over time, then drill into the themes and formats driving the signal."
      >
        <FilterSelect
          label="Year"
          icon={CalendarRange}
          value={selectedYear}
          onChange={(event) => setSelectedYear(event.target.value)}
          options={yearOptions}
          ariaLabel="Filter sentiment by release year"
        />
        <span className="chip">
          <Activity size={12} className="text-emerald-300" />
          {formatNumber(stats.total)} signals
        </span>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {['Positive', 'Neutral', 'Negative'].map((sentiment, index) => {
          const meta = sentimentMeta[sentiment];
          const count = stats.totals[sentiment] || 0;
          const share = stats.total ? (count / stats.total) * 100 : 0;
          return (
            <StatCard
              key={sentiment}
              index={index}
              label={`${sentiment} sentiment`}
              value={formatPercent(share, 1)}
              sublabel={`${formatNumber(count)} titles`}
              icon={meta.icon}
              tone={meta.tone}
            />
          );
        })}
        <StatCard
          index={3}
          label="Signals analyzed"
          value={formatNumber(stats.total)}
          sublabel={
            selectedYear === 'all' ? 'Across all years' : `Released in ${selectedYear}`
          }
          icon={Activity}
          tone="violet"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard
          index={1}
          title="Sentiment distribution"
          subtitle="Share of audience tone in the selection"
        >
          <BarChart
            data={stats.rows}
            xKey="Share"
            yKey="Sentiment"
            orientation="h"
            colorKey="Sentiment"
            height={330}
          />
        </ChartCard>

        <ChartCard
          className="xl:col-span-2"
          index={2}
          title="Sentiment over time"
          subtitle="How tone changes across release years"
        >
          <LineChart
            data={filteredData}
            xKey="Release Year"
            yKey="Total Count"
            colorKey="Sentiment"
            height={330}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard index={1} title="Key indicators" subtitle="Sentiment health signals">
          <ProgressList items={indicatorItems} className="pt-2" />
        </ChartCard>

        <ChartCard index={2} title="Feedback themes" subtitle="What audiences talk about">
          <ul className="space-y-3 pt-1">
            {mockFeedbackThemes.map((item) => (
              <li
                key={item.Theme}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
              >
                <span className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <MessageCircle size={14} className="text-zinc-500" />
                  {item.Theme}
                </span>
                <span className="shrink-0 text-[11px] font-semibold text-emerald-300">
                  {item.Sentiment}
                </span>
              </li>
            ))}
          </ul>
        </ChartCard>

        <ChartCard index={3} title="Sentiment by genre" subtitle="Average audience score">
          <ul className="space-y-3 pt-1">
            {mockSentimentByGenre.map((item) => (
              <li
                key={item.Genre}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
              >
                <span className="text-sm text-zinc-300">{item.Genre}</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                  <Star size={12} fill="currentColor" />
                  {item.Score}
                </span>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard index={1} title="Response actions" subtitle="Audience feedback resolution">
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] p-4">
              <p className="font-display text-2xl font-extrabold text-white">
                {formatNumber(mockResponseActions.resolved)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Resolved</p>
              <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-emerald-300">
                <ThumbsUp size={10} /> Within 24 hours
              </p>
            </div>
            <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.06] p-4">
              <p className="font-display text-2xl font-extrabold text-white">
                {formatNumber(mockResponseActions.inProgress)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">In progress</p>
              <p className="mt-2 text-[10px] font-medium text-amber-300">Being addressed</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard
          className="lg:col-span-2"
          index={2}
          title="Social media impact"
          subtitle="Audience reach across major platforms"
        >
          <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
            {mockSocialMediaImpactData.map((item) => (
              <div
                key={item.Platform}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <span
                  className="block h-1.5 w-8 rounded-full"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 14px ${item.color}66` }}
                />
                <p className="mt-4 font-display text-xl font-extrabold text-white">{item.Count}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.Platform}</p>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
