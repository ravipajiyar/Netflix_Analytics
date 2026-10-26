<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { fetchTopActors, fetchTopActorsByYear } from '../api';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import Loading from '../components/Loading';
import PieChart from '../components/PieChart';
import {filterDataByYear} from '../utils';

const Actors = () => {
  const [actorsData, setActorsData] = useState(null);
    const [selectedYear, setSelectedYear] = useState('all');
    const [view, setView] = useState('Yearly');
  const [isLoading, setIsLoading] = useState(true);
    const mockGenreData = [
      { "Genre": "Drama", "Percentage": 42 },
        { "Genre": "Action", "Percentage": 28 },
        { "Genre": "Comedy", "Percentage": 30 },
  ];

    const mockSocialMediaImpactData = [
        { "Platform": "Twitter Mentions", "Count": "2.3M" },
        { "Platform": "Instagram Followers", "Count": "5.1M" },
        { "Platform": "YouTube Views", "Count": "12.7M" },
    ];

    const mockViewerRatings = [
        { "Rating": "1", "Percentage": 10 },
        { "Rating": "2", "Percentage": 15 },
        { "Rating": "3", "Percentage": 40 },
        { "Rating": "4", "Percentage": 60 },
       { "Rating": "5", "Percentage": 70 },
    ]

    const mockContentAnalysis = {
      totalActors: "15,234",
       leadingRoles: "5,678",
        supportingRoles: "8,932",
         newTalents: "+892"
    }
       const mockMonthlyActors = [
           { "Actor": "Tom Hanks", "Total Count": 5 },
            { "Actor": "Morgan Freeman", "Total Count": 3 },
           { "Actor": "Meryl Streep", "Total Count": 4 },
           { "Actor": "Leonardo Di Caprio", "Total Count": 1 },
           { "Actor": "Brad Pitt", "Total Count": 2 }
         ];


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
          let response;
          if (selectedYear === 'all') {
           response = await fetchTopActors();
          } else {
              response = await fetchTopActorsByYear(selectedYear);
          }
          setActorsData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
=======
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
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
      }
    };

    fetchData();
<<<<<<< HEAD
  }, [selectedYear]);

  if (isLoading) {
    return <Loading />;
  }
   const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value) || 'all');
    };
      const toggleView = (newView) => {
        setView(newView);
    };

     const getActorData = () => {
        if (view === 'Monthly') {
             return mockMonthlyActors
        }
         return filterDataByYear(actorsData, "Release Year", selectedYear)
    }
        const currentActorsData = getActorData();
       const formattedActorsForTable = currentActorsData ? currentActorsData.slice(0, 5).map((item, index) => ({
          ...item,
          color: ['#3b82f6', '#10b981', '#9333ea', '#f59e0b', '#ef4444'][index % 5]
     })) : []


     const minYear = actorsData ? Math.min(...actorsData.map(item => item['Release Year'])) : 2000;
    const maxYear = actorsData ? Math.max(...actorsData.map(item => item['Release Year'])) : 2021;
  const genreDataForPieChart = mockGenreData.map(item => ({ M_rating: item.Genre, counts: item.Percentage}));
  return (
       <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Actor Analytics</h2>
              <p className="text-gray-600 mb-6">Comprehensive analysis of actor performances and appearances on Netflix</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white shadow rounded p-4">
                        <h3 className="text-gray-500 text-sm">Total Actors</h3>
                            <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.totalActors}</p>
                           <p className="text-sm text-gray-500">Active on Platform</p>
                    </div>
                   <div className="bg-white shadow rounded p-4">
                        <h3 className="text-gray-500 text-sm">Leading Roles</h3>
                        <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.leadingRoles}</p>
                         <p className="text-sm text-gray-500">This Year</p>
                   </div>
                  <div className="bg-white shadow rounded p-4">
                     <h3 className="text-gray-500 text-sm">Supporting Roles</h3>
                     <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.supportingRoles}</p>
                     <p className="text-sm text-gray-500">This Year</p>
                  </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-500 text-sm">New Talents</h3>
                     <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.newTalents}</p>
                      <p className="text-sm text-gray-500">This Quarter</p>
               </div>
           </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                   <ChartCard title="Top Performing Actors">
                      <BarChart data={currentActorsData} xKey="Total Count" yKey="Actor" orientation="h"/>
                     </ChartCard>
                    <ChartCard title="Genre Distribution">
                      <PieChart data={genreDataForPieChart}  />
                   </ChartCard>
              </div>
            <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Top Actors</h3>
                  <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                         <thead>
                           <tr>
                              <th className="border px-4 py-2">Rank</th>
                              <th className="border px-4 py-2">Actor</th>
                              <th className="border px-4 py-2">Total Productions</th>
                         </tr>
                        </thead>
                        <tbody>
                            {formattedActorsForTable.map((item, index) => (
                                <tr key={index}>
                                     <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                         <span className="flex items-center">
                                             <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: item.color}}></span>
                                          {item.Actor}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">{item['Total Count']}</td>
                              </tr>
                           ))}
                       </tbody>
                    </table>
                </div>
            </div>


             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                 <div className="bg-white shadow rounded p-4">
                         <h3 className="text-lg font-semibold mb-4">Viewer Ratings</h3>
                           <div className="flex items-center justify-between text-gray-700">
                                 {mockViewerRatings.map(item => (
                                     <div className="flex flex-col items-center" >
                                     <div className="bg-blue-300 h-6 rounded-b-md"  style={{width: "100%", height: `${item.Percentage}px`, }}> </div>
                                       <span className="text-sm">{item.Rating}★</span>
                                     </div>
                                 ))}
                            </div>

                    </div>
                   <div className="bg-white shadow rounded p-4">
                       <h3 className="text-lg font-semibold mb-4">Award Nominations</h3>
                       <div className="mb-2">
                         <div className="bg-gray-300 rounded-full h-2 w-full">
                           <div className="bg-purple-500 rounded-full h-2" style={{ width: '78%' }}></div>
                       </div>
                      <span className="text-gray-700 text-sm">78% PROGRESS</span>
                    </div>
                   </div>
                 <div className="bg-white shadow rounded p-4">
                     <h3 className="text-lg font-semibold mb-4">Social Media Impact</h3>
                     <ul className="text-gray-700">
                         {mockSocialMediaImpactData.map((item, index) => (
                             <li key={index} className="flex items-center mb-2">
                                 <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#1d9bf0', '#f56040', '#ff0000'][index % 3] }}></div>
                                 <span>{item.Platform}</span>
                                <span className="ml-auto font-medium">{item.Count}</span>
                             </li>
                           ))}
                      </ul>
                  </div>
            </div>


        </div>
  );
};

export default Actors;
=======
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
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
