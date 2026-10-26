import { useEffect, useMemo, useState } from 'react';
import {
  CalendarRange,
  Film,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import { fetchTopActors, fetchTopActorsByYear } from '../api';
import BarChart from '../components/BarChart';
import ChartCard from '../components/ChartCard';
import FilterSelect from '../components/FilterSelect';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import PieChart from '../components/PieChart';
import SegmentedControl from '../components/SegmentedControl';
import StatCard from '../components/StatCard';
import { buildYearOptions, formatNumber } from '../utils';

const mockGenreData = [
  { Genre: 'Drama', Percentage: 42 },
  { Genre: 'Action', Percentage: 28 },
  { Genre: 'Comedy', Percentage: 30 },
];

const mockSocialMediaImpactData = [
  { Platform: 'Twitter Mentions', Count: '2.3M', color: '#1d9bf0' },
  { Platform: 'Instagram Followers', Count: '5.1M', color: '#f56040' },
  { Platform: 'YouTube Views', Count: '12.7M', color: '#ff0000' },
];

const mockViewerRatings = [
  { Rating: '1★', Percentage: 10 },
  { Rating: '2★', Percentage: 15 },
  { Rating: '3★', Percentage: 40 },
  { Rating: '4★', Percentage: 60 },
  { Rating: '5★', Percentage: 70 },
];

const mockMonthlyActors = [
  { Actor: 'Tom Hanks', 'Total Count': 5 },
  { Actor: 'Morgan Freeman', 'Total Count': 3 },
  { Actor: 'Meryl Streep', 'Total Count': 4 },
  { Actor: 'Leonardo DiCaprio', 'Total Count': 1 },
  { Actor: 'Brad Pitt', 'Total Count': 2 },
];

const rankColors = ['#e50914', '#fb7185', '#a78bfa', '#22d3ee', '#34d399'];

const Actors = () => {
  const [actorsData, setActorsData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [view, setView] = useState('Yearly');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response =
          selectedYear === 'all'
            ? await fetchTopActors()
            : await fetchTopActorsByYear(Number(selectedYear));
        if (active) setActorsData(response ?? []);
      } catch (error) {
        console.error('Error fetching actors data:', error);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [selectedYear]);

  const currentActorsData = view === 'Monthly' ? mockMonthlyActors : actorsData;

  const stats = useMemo(() => {
    const sorted = [...currentActorsData].sort(
      (a, b) => (Number(b['Total Count']) || 0) - (Number(a['Total Count']) || 0)
    );
    const totalCredits = currentActorsData.reduce(
      (sum, actor) => sum + (Number(actor['Total Count']) || 0),
      0
    );

    return {
      topActor: sorted[0],
      tracked: currentActorsData.length,
      totalCredits,
      average: currentActorsData.length
        ? Math.round(totalCredits / currentActorsData.length)
        : 0,
      sorted,
    };
  }, [currentActorsData]);

  const tableRows = useMemo(
    () => stats.sorted.slice(0, 5).map((item, index) => ({ ...item, color: rankColors[index % rankColors.length] })),
    [stats.sorted]
  );

  const genreForPieChart = mockGenreData.map((item) => ({
    M_rating: item.Genre,
    counts: item.Percentage,
  }));

  const yearOptions = useMemo(() => buildYearOptions(), []);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Talent"
        title="Actor analytics"
        description="Discover the performers with the strongest presence across the Netflix catalog, filtered by release year."
      >
        <FilterSelect
          label="Year"
          icon={CalendarRange}
          value={selectedYear}
          onChange={(event) =>
            setSelectedYear(event.target.value === 'all' ? 'all' : Number(event.target.value))
          }
          options={yearOptions}
          ariaLabel="Filter actors by release year"
        />
        <SegmentedControl
          value={view}
          onChange={setView}
          ariaLabel="Actor data view"
          options={[
            { value: 'Yearly', label: 'Yearly' },
            { value: 'Monthly', label: 'Monthly' },
          ]}
        />
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          index={0}
          label="Top actor"
          value={stats.topActor?.Actor ?? '—'}
          sublabel={
            stats.topActor ? `${stats.topActor['Total Count']} productions` : 'No data'
          }
          icon={Star}
          tone="red"
        />
        <StatCard
          index={1}
          label="Tracked actors"
          value={formatNumber(stats.tracked)}
          sublabel={view === 'Monthly' ? 'Featured this month' : 'Across the catalog'}
          icon={Users}
          tone="violet"
        />
        <StatCard
          index={2}
          label="Combined credits"
          value={formatNumber(stats.totalCredits)}
          sublabel="Acting appearances"
          icon={Film}
          tone="cyan"
        />
        <StatCard
          index={3}
          label="Avg. credits"
          value={formatNumber(stats.average)}
          sublabel="Per tracked actor"
          icon={TrendingUp}
          tone="emerald"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard
          className="xl:col-span-2"
          index={1}
          title="Top performing actors"
          subtitle="Most frequent cast appearances in the selected period"
        >
          <BarChart
            data={stats.sorted}
            xKey="Total Count"
            yKey="Actor"
            orientation="h"
            height={330}
          />
        </ChartCard>

        <ChartCard
          index={2}
          title="Genre distribution"
          subtitle="Share of roles by primary genre"
        >
          <PieChart data={genreForPieChart} height={330} />
        </ChartCard>
      </div>

      <div className="card animate-fade-up p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-base font-semibold text-white">Actor leaderboard</h3>
            <p className="mt-1 text-xs text-zinc-500">Top five performers by production count</p>
          </div>
          <span className="chip">
            <Trophy size={12} className="text-amber-300" />
            Top 5
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Actor</th>
                <th className="text-right">Productions</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((item, index) => (
                <tr key={`${item.Actor}-${index}`}>
                  <td>
                    <span
                      className="grid h-7 w-7 place-items-center rounded-lg border text-[11px] font-bold"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}33`,
                        backgroundColor: `${item.color}14`,
                      }}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td>
                    <span className="flex items-center gap-2.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium text-white">{item.Actor}</span>
                    </span>
                  </td>
                  <td className="text-right">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-zinc-200">
                      {item['Total Count']}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard index={1} title="Viewer ratings" subtitle="Distribution of audience scores">
          <BarChart
            data={mockViewerRatings}
            xKey="Rating"
            yKey="Percentage"
            color="#f59e0b"
            height={230}
          />
        </ChartCard>

        <ChartCard index={2} title="Award nominations" subtitle="Industry recognition progress">
          <div className="flex h-[230px] flex-col justify-center">
            <p className="font-display text-5xl font-extrabold tracking-tight text-white">78%</p>
            <p className="mt-1 text-xs text-zinc-500">Of top actors received a nomination</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                style={{ width: '78%', boxShadow: '0 0 18px rgba(167,139,250,0.5)' }}
              />
            </div>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-violet-300">
              Strong industry footprint
            </p>
          </div>
        </ChartCard>

        <ChartCard index={3} title="Social impact" subtitle="Audience reach across platforms">
          <ul className="flex h-[230px] flex-col justify-center gap-4">
            {mockSocialMediaImpactData.map((item) => (
              <li key={item.Platform} className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}88` }}
                />
                <span className="text-sm text-zinc-300">{item.Platform}</span>
                <span className="ml-auto text-sm font-semibold text-white">{item.Count}</span>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>
    </div>
  );
};

export default Actors;
