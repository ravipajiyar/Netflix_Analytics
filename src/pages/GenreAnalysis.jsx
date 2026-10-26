<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { fetchTopGenres } from '../api';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import Loading from '../components/Loading';
import PieChart from '../components/PieChart';
import { filterDataByYear } from '../utils';

const GenreAnalysis = () => {
  const [genreData, setGenreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState('all');
    const mockGrowthTrends = [
      { "Genre": "Drama", "Percentage": 45 },
        { "Genre": "Action", "Percentage": 38 },
        { "Genre": "Comedy", "Percentage": 32 },
  ];

     const mockViewerDemographics = [
         { "Age Group": "18-24 years", "Percentage": 35 },
         { "Age Group": "25-34 years", "Percentage": 42 },
         { "Age Group": "35+ years", "Percentage": 23 },
   ];

    const mockEngagementMetrics = {
        averageWatchTime: "2.5 hrs",
        completionRate: 78,
    };

    const mockRegionalPreferences = [
        { "Region": "North America", "Genre": "Drama" },
        { "Region": "Europe", "Genre": "Comedy" },
        { "Region": "Asia", "Genre": "Action" },
    ];

    const mockContentAnalysis = {
        totalGenres: "27",
        topGenre: "Drama",
        fastestGrowing: "Thriller",
        newAdditions: "124"
    }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchTopGenres();
        setGenreData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
=======
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
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
      }
    };

    fetchData();
<<<<<<< HEAD
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  const handleYearChange = (e) => {
      setSelectedYear(parseInt(e.target.value) || 'all');
  };
    const minYear = genreData ? Math.min(...genreData.map(item => item['Release Year'])) : 2000;
    const maxYear = genreData ? Math.max(...genreData.map(item => item['Release Year'])) : 2021;

const genreForPieChart = genreData ? filterDataByYear(genreData, "Release Year", selectedYear).map(item => ({...item, "M_rating":item.Genre, "counts":item['Total Count'] })) : [];
const viewerDemoForBarChart = mockViewerDemographics.map(item => ({ ...item,  "Percentage":item.Percentage, "Age Group":item['Age Group']  }));
    const growthTrendForBarChart = mockGrowthTrends.map(item => ({ ...item, "Percentage":item.Percentage, "Genre":item.Genre }));

  return (
         <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Genre Analytics</h2>
            <p className="text-gray-600 mb-6">Detailed analysis of content distribution across different genres</p>
               <div className="mb-4 flex justify-end">
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
                 </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                   <div className="bg-white shadow rounded p-4">
                        <h3 className="text-gray-500 text-sm">Total Genres</h3>
                        <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.totalGenres}</p>
                       <p className="text-sm text-gray-500">Active Categories</p>
                   </div>
                 <div className="bg-white shadow rounded p-4">
                      <h3 className="text-gray-500 text-sm">Top Genre</h3>
                        <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.topGenre}</p>
                         <p className="text-sm text-gray-500">3,245 Titles</p>
                </div>
                 <div className="bg-white shadow rounded p-4">
                       <h3 className="text-gray-500 text-sm">Fastest Growing</h3>
                       <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.fastestGrowing}</p>
                        <p className="text-sm text-green-500">+45% Growth</p>
                   </div>
                    <div className="bg-white shadow rounded p-4">
                         <h3 className="text-gray-500 text-sm">New Additions</h3>
                        <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.newAdditions}</p>
                       <p className="text-sm text-gray-500">This Month</p>
                    </div>
               </div>


                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                   <ChartCard title="Popular Genres Distribution">
                     <PieChart data={genreForPieChart}  />
                   </ChartCard>
                     <div className="bg-white shadow rounded p-4">
                         <h3 className="text-lg font-semibold mb-4">Genre Growth Trends</h3>
                        <ul className="text-gray-700">
                          {growthTrendForBarChart.map((item, index) => (
                            <li key={index} className="flex items-center mb-2">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#3b82f6', '#ef4444', '#10b981'][index % 3] }}></div>
                                 <span>{item.Genre}</span>
                                <span className="ml-auto text-green-500 font-medium">{item.Percentage}%</span>
                           </li>
                           ))}
                       </ul>
                   </div>

                 </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                 <div className="bg-white shadow rounded p-4">
                   <ChartCard title="Viewer Demographics">
                        <BarChart data={viewerDemoForBarChart} xKey="Percentage" yKey="Age Group" orientation="h"/>
                  </ChartCard>
                  </div>
                 <div className="bg-white shadow rounded p-4">
                           <h3 className="text-lg font-semibold mb-4">Engagement Metrics</h3>
                             <p className="text-xl font-semibold text-gray-700">{mockEngagementMetrics.averageWatchTime}</p>
                           <p className="text-sm text-green-500">↑ 15% vs last month</p>
                            <p className="text-xl font-semibold text-gray-700 mt-2">{mockEngagementMetrics.completionRate}%</p>
                            <p className="text-sm text-green-500">↑ 8% vs last month</p>
                   </div>
                 <div className="bg-white shadow rounded p-4">
                     <h3 className="text-lg font-semibold mb-4">Regional Preferences</h3>
                     <ul className="text-gray-700">
                         {mockRegionalPreferences.map((item, index) => (
                             <li key={index} className="flex items-center mb-2">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: ['#3b82f6', '#ef4444', '#10b981'][index % 3] }}></div>
                                  <span>{item.Region}</span>
                                  <span className="ml-auto font-medium">{item.Genre}</span>
                            </li>
                            ))}
                        </ul>
                 </div>
               </div>
          </div>
  );
};

export default GenreAnalysis;
=======
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
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
