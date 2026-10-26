<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { fetchTopDirectors } from '../api';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import Loading from '../components/Loading';
import { filterDataByYear } from '../utils'

const Directors = () => {
    const [directorsData, setDirectorsData] = useState(null);
    const [view, setView] = useState('Yearly');
    const [selectedYear, setSelectedYear] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    const mockGenreData = [
        { "Genre": "Drama", "Percentage": 45 },
        { "Genre": "Comedy", "Percentage": 30 },
        { "Genre": "Action", "Percentage": 25 },
    ];

    const mockProductionTrends = [
        { "Trend": "Increasing Output", "Percentage": 23 },
        { "Trend": "International Collaborations", "Percentage": 45 },
        { "Trend": "Award Nominations", "Percentage": 12 },
    ];
     const mockMonthlyDirectors = [
          { "Director": "Rajkumar Hirani", "Total Count": 3 },
          { "Director": "Paul Giamatti", "Total Count": 2 },
          { "Director": "Jan Suter", "Total Count": 4 },
          { "Director": "Super Director", "Total Count": 1 },
          { "Director": "Marcos Pillow", "Total Count": 3 }
        ];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchTopDirectors();
                setDirectorsData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const toggleView = (newView) => {
        setView(newView);
    };

    const handleYearChange = (e) => {
       setSelectedYear(parseInt(e.target.value) || 'all');
    };

     const minYear = directorsData ? Math.min(...directorsData.map(item => item['Release Year'])) : 2000;
    const maxYear = directorsData ? Math.max(...directorsData.map(item => item['Release Year'])) : 2021;


    const getDirectorData = () => {
        if (view === 'Monthly') {
             return mockMonthlyDirectors
        }
        return filterDataByYear(directorsData, "Release Year", selectedYear)
    }
     const currentDirectorsData = getDirectorData()
     const formattedDirectorsForTable = currentDirectorsData ? currentDirectorsData.slice(0, 5).map((item, index) => ({
          ...item,
          color: ['#3b82f6', '#10b981', '#9333ea', '#f59e0b', '#ef4444'][index % 5]
     })) : []
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Director Analysis</h2>
            <p className="text-gray-600 mb-6">Detailed insights into Netflix's top directors and their contributions</p>
             <div className="mb-4 flex justify-between items-center">
                 <div className="flex justify-start items-center">
                 <select
                      value={selectedYear}
                      onChange={handleYearChange}
                       className="bg-white border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All Years</option>
                        {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map(year => (
                           <option key={year} value={year}>{year}</option>
                         ))}
                 </select>
                   <div className="flex justify-start mb-2  ml-4">
                        <button
                              onClick={() => toggleView('Monthly')}
                             className={`rounded-md px-3 py-1 text-sm ${ view==='Monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}
                          >
                             Monthly
                        </button>
                        <button
                              onClick={() => toggleView('Yearly')}
                            className={`rounded-md px-3 py-1 text-sm ml-2 ${ view==='Yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
                             Yearly
                       </button>
                    </div>
                  </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">Most Active Director</h3>
                    <p className="text-2xl font-bold text-gray-800">{currentDirectorsData && currentDirectorsData[0]?.Director}</p>
                    <p className="text-sm text-gray-500">{currentDirectorsData && currentDirectorsData[0]?.['Total Count']} Productions</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">Average Productions</h3>
                    <p className="text-2xl font-bold text-gray-800">18.4</p>
                    <p className="text-sm text-gray-500">Per Director</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">New Directors</h3>
                    <p className="text-2xl font-bold text-gray-800">+15</p>
                    <p className="text-sm text-gray-500">This Quarter</p>
                </div>
            </div>

            <div className="mb-8">
                <ChartCard title="Top Directors Performance">
                    <BarChart data={currentDirectorsData} xKey="Total Count" yKey="Director" orientation="h" />
                </ChartCard>
            </div>
            <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Top Directors</h3>
                  <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                         <thead>
                           <tr>
                              <th className="border px-4 py-2">Rank</th>
                              <th className="border px-4 py-2">Director</th>
                              <th className="border px-4 py-2">Total Productions</th>
                         </tr>
                        </thead>
                        <tbody>
                            {formattedDirectorsForTable.map((item, index) => (
                                <tr key={index}>
                                     <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                         <span className="flex items-center">
                                             <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: item.color}}></span>
                                          {item.Director}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">{item['Total Count']}</td>
                              </tr>
                           ))}
                       </tbody>
                    </table>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-4">Genre Distribution</h3>
                    <div className="flex items-center justify-between text-gray-700">
                       {mockGenreData.map(item => (
                           <div className="flex flex-col items-center" >
                                <div className="bg-blue-300 h-6 rounded-b-md" style={{width: "100%", height: `${item.Percentage}px`, }}> </div>
                             <span className="text-sm">{item.Genre}</span>
                           </div>
                         ))}
                   </div>
                </div>

                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-4">Production Trends</h3>
                    <ul className="text-gray-700">
                        {mockProductionTrends.map((item, index) => (
                            <li key={index} className="flex items-center mb-2">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#10b981', '#3b82f6', '#9333ea'][index % 3] }}></div>
                                <span>{item.Trend}</span>
                                <span className="ml-auto text-green-500 font-medium">{item.Percentage}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default Directors;
=======
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
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
