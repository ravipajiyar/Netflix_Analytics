import { useEffect, useMemo, useState } from 'react';
import { CalendarRange, Film, Star, TrendingUp, Trophy, User } from 'lucide-react';
import { fetchTopDirectors, fetchTopDirectorsByYear } from '../api';
import BarChart from '../components/BarChart';
import ChartCard from '../components/ChartCard';
import FilterSelect from '../components/FilterSelect';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import ProgressList from '../components/ProgressList';
import SegmentedControl from '../components/SegmentedControl';
import StatCard from '../components/StatCard';
import { buildYearOptions, formatNumber } from '../utils';

const mockGenreData = [
  { Genre: 'Drama', Percentage: 45 },
  { Genre: 'Comedy', Percentage: 30 },
  { Genre: 'Action', Percentage: 25 },
];

const mockProductionTrends = [
  { Trend: 'Increasing output', Percentage: 23 },
  { Trend: 'International collaborations', Percentage: 45 },
  { Trend: 'Award nominations', Percentage: 12 },
];

const mockMonthlyDirectors = [
  { Director: 'Rajkumar Hirani', 'Total Count': 3 },
  { Director: 'Paul Giamatti', 'Total Count': 2 },
  { Director: 'Jan Suter', 'Total Count': 4 },
  { Director: 'Super Director', 'Total Count': 1 },
  { Director: 'Marcos Pillow', 'Total Count': 3 },
];

const rankColors = ['#e50914', '#fb7185', '#a78bfa', '#22d3ee', '#34d399'];

const Directors = () => {
  const [directorsData, setDirectorsData] = useState([]);
  const [view, setView] = useState('Yearly');
  const [selectedYear, setSelectedYear] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response =
          selectedYear === 'all'
            ? await fetchTopDirectors()
            : await fetchTopDirectorsByYear(Number(selectedYear));
        if (active) setDirectorsData(response ?? []);
      } catch (error) {
        console.error('Error fetching directors data:', error);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [selectedYear]);

  const currentDirectorsData = view === 'Monthly' ? mockMonthlyDirectors : directorsData;

  const stats = useMemo(() => {
    const sorted = [...currentDirectorsData].sort(
      (a, b) => (Number(b['Total Count']) || 0) - (Number(a['Total Count']) || 0)
    );
    const totalCredits = currentDirectorsData.reduce(
      (sum, director) => sum + (Number(director['Total Count']) || 0),
      0
    );

    return {
      topDirector: sorted[0],
      tracked: currentDirectorsData.length,
      totalCredits,
      average: currentDirectorsData.length
        ? (totalCredits / currentDirectorsData.length).toFixed(1)
        : '0',
      sorted,
    };
  }, [currentDirectorsData]);

  const tableRows = useMemo(
    () => stats.sorted.slice(0, 5).map((item, index) => ({ ...item, color: rankColors[index % rankColors.length] })),
    [stats.sorted]
  );

  const genreItems = mockGenreData.map((item) => ({
    label: item.Genre,
    value: item.Percentage,
    display: `${item.Percentage}%`,
  }));

  const trendItems = mockProductionTrends.map((item) => ({
    label: item.Trend,
    value: item.Percentage,
    display: `${item.Percentage}%`,
    color: '#a78bfa',
  }));

  const yearOptions = useMemo(() => buildYearOptions(), []);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Talent"
        title="Director analysis"
        description="Explore the creators behind Netflix's biggest titles and how their output shifts across release years."
      >
        <FilterSelect
          label="Year"
          icon={CalendarRange}
          value={selectedYear}
          onChange={(event) =>
            setSelectedYear(event.target.value === 'all' ? 'all' : Number(event.target.value))
          }
          options={yearOptions}
          ariaLabel="Filter directors by release year"
        />
        <SegmentedControl
          value={view}
          onChange={setView}
          ariaLabel="Director data view"
          options={[
            { value: 'Yearly', label: 'Yearly' },
            { value: 'Monthly', label: 'Monthly' },
          ]}
        />
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          index={0}
          label="Most active director"
          value={stats.topDirector?.Director ?? '—'}
          sublabel={
            stats.topDirector
              ? `${stats.topDirector['Total Count']} productions`
              : 'No data'
          }
          icon={Star}
          tone="red"
        />
        <StatCard
          index={1}
          label="Tracked directors"
          value={formatNumber(stats.tracked)}
          sublabel={view === 'Monthly' ? 'Featured this month' : 'Across the catalog'}
          icon={User}
          tone="violet"
        />
        <StatCard
          index={2}
          label="Combined credits"
          value={formatNumber(stats.totalCredits)}
          sublabel="Directed titles"
          icon={Film}
          tone="cyan"
        />
        <StatCard
          index={3}
          label="Avg. productions"
          value={stats.average}
          sublabel="Per tracked director"
          icon={TrendingUp}
          tone="emerald"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard
          className="xl:col-span-2"
          index={1}
          title="Top directors performance"
          subtitle="Production count by director for the selected period"
        >
          <BarChart
            data={stats.sorted}
            xKey="Total Count"
            yKey="Director"
            orientation="h"
            height={330}
          />
        </ChartCard>

        <ChartCard index={2} title="Production trends" subtitle="Direction of creative output">
          <ProgressList items={trendItems} className="pt-2" />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="card animate-fade-up p-5 sm:p-6 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-base font-semibold text-white">
                Director leaderboard
              </h3>
              <p className="mt-1 text-xs text-zinc-500">
                Top five directors by production count
              </p>
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
                  <th>Director</th>
                  <th className="text-right">Productions</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((item, index) => (
                  <tr key={`${item.Director}-${index}`}>
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
                        <span className="font-medium text-white">{item.Director}</span>
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

        <ChartCard index={3} title="Genre distribution" subtitle="Primary genres directed">
          <ProgressList items={genreItems} className="pt-2" />
        </ChartCard>
      </div>
    </div>
  );
};

export default Directors;
