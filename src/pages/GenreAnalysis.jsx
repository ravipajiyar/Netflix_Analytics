import { useEffect, useMemo, useState } from 'react';
import { CalendarRange, Flame, Layers, Sparkles, Tag, Target, Users } from 'lucide-react';
import { fetchTopGenres, fetchTopGenresByYear } from '../api';
import BarChart from '../components/BarChart';
import ChartCard from '../components/ChartCard';
import FilterSelect from '../components/FilterSelect';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import PieChart from '../components/PieChart';
import ProgressList from '../components/ProgressList';
import StatCard from '../components/StatCard';
import { buildYearOptions, formatNumber, formatPercent } from '../utils';

const mockGrowthTrends = [
  { Genre: 'Drama', Percentage: 45 },
  { Genre: 'Action', Percentage: 38 },
  { Genre: 'Comedy', Percentage: 32 },
];

const mockViewerDemographics = [
  { Age: '18–24 years', Percentage: 35 },
  { Age: '25–34 years', Percentage: 42 },
  { Age: '35+ years', Percentage: 23 },
];

const mockEngagementMetrics = {
  averageWatchTime: '2.5 hrs',
  completionRate: 78,
};

const mockRegionalPreferences = [
  { Region: 'North America', Genre: 'Drama', color: '#e50914' },
  { Region: 'Europe', Genre: 'Comedy', color: '#22d3ee' },
  { Region: 'Asia', Genre: 'Action', color: '#a78bfa' },
];

const GenreAnalysis = () => {
  const [genreData, setGenreData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response =
          selectedYear === 'all'
            ? await fetchTopGenres()
            : await fetchTopGenresByYear(Number(selectedYear));
        if (active) setGenreData(response ?? []);
      } catch (error) {
        console.error('Error fetching genre data:', error);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [selectedYear]);

  const stats = useMemo(() => {
    const sorted = [...genreData].sort(
      (a, b) => (Number(b['Total Count']) || 0) - (Number(a['Total Count']) || 0)
    );
    const total = genreData.reduce((sum, item) => sum + (Number(item['Total Count']) || 0), 0);
    const topGenre = sorted[0];

    return {
      sorted,
      total,
      tracked: genreData.length,
      topGenre,
      dominantShare: topGenre && total ? (Number(topGenre['Total Count']) / total) * 100 : 0,
    };
  }, [genreData]);

  const genreForPieChart = useMemo(
    () =>
      stats.sorted.map((item) => ({
        M_rating: item.Genre,
        counts: Number(item['Total Count']) || 0,
      })),
    [stats.sorted]
  );

  const growthItems = mockGrowthTrends.map((item) => ({
    label: item.Genre,
    value: item.Percentage,
    display: `${item.Percentage}%`,
    color: '#e50914',
  }));

  const demographicItems = mockViewerDemographics.map((item) => ({
    label: item.Age,
    value: item.Percentage,
    display: `${item.Percentage}%`,
    color: '#22d3ee',
  }));

  const yearOptions = useMemo(() => buildYearOptions(), []);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catalog"
        title="Genre analytics"
        description="See which categories dominate the library, how their share shifts by year, and where audience demand is heading."
      >
        <FilterSelect
          label="Year"
          icon={CalendarRange}
          value={selectedYear}
          onChange={(event) => setSelectedYear(event.target.value)}
          options={yearOptions}
          ariaLabel="Filter genres by release year"
        />
        <span className="chip">
          <Sparkles size={12} className="text-brand-soft" />
          {stats.tracked} categories
        </span>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          index={0}
          label="Top genre"
          value={stats.topGenre?.Genre ?? '—'}
          sublabel={
            stats.topGenre
              ? `${formatNumber(stats.topGenre['Total Count'])} titles`
              : 'No data'
          }
          icon={Flame}
          tone="red"
        />
        <StatCard
          index={1}
          label="Genres tracked"
          value={formatNumber(stats.tracked)}
          sublabel={selectedYear === 'all' ? 'Across all years' : `In ${selectedYear}`}
          icon={Tag}
          tone="violet"
        />
        <StatCard
          index={2}
          label="Titles analyzed"
          value={formatNumber(stats.total)}
          sublabel="Genre assignments"
          icon={Layers}
          tone="cyan"
        />
        <StatCard
          index={3}
          label="Dominant share"
          value={formatPercent(stats.dominantShare, 1)}
          sublabel="Held by the top genre"
          icon={Target}
          tone="emerald"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard
          className="xl:col-span-2"
          index={1}
          title="Genre performance"
          subtitle="Title count by category in the selected period"
        >
          <BarChart
            data={stats.sorted}
            xKey="Total Count"
            yKey="Genre"
            orientation="h"
            height={340}
          />
        </ChartCard>

        <ChartCard
          index={2}
          title="Genre distribution"
          subtitle="Relative share across the catalog"
        >
          <PieChart data={genreForPieChart} height={340} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ChartCard index={1} title="Growth trends" subtitle="Fastest rising genres">
          <ProgressList items={growthItems} className="pt-2" />
        </ChartCard>

        <ChartCard index={2} title="Viewer demographics" subtitle="Audience age mix">
          <ProgressList items={demographicItems} className="pt-2" />
        </ChartCard>

        <ChartCard index={3} title="Regional preferences" subtitle="Leading genre by region">
          <ul className="space-y-4 pt-2">
            {mockRegionalPreferences.map((item) => (
              <li key={item.Region} className="flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}88` }}
                />
                <span className="text-sm text-zinc-300">{item.Region}</span>
                <span className="ml-auto rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-zinc-200">
                  {item.Genre}
                </span>
              </li>
            ))}
          </ul>
        </ChartCard>

        <ChartCard index={4} title="Engagement" subtitle="How audiences consume genres">
          <div className="space-y-5 pt-2">
            <div>
              <p className="font-display text-3xl font-extrabold text-white">
                {mockEngagementMetrics.averageWatchTime}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Average watch time</p>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Completion</span>
                <span className="font-semibold text-white">
                  {mockEngagementMetrics.completionRate}%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-rose-400"
                  style={{ width: `${mockEngagementMetrics.completionRate}%` }}
                />
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-300">
                <Users size={11} /> ↑ 8% vs last month
              </p>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default GenreAnalysis;
