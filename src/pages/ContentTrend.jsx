<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { fetchContentTrend } from '../api';
import ChartCard from '../components/ChartCard';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart'
import Loading from '../components/Loading';
import YearSlider from '../components/YearSlider';
import {filterDataByYear} from '../utils';

const ContentTrend = () => {
  const [contentTrendData, setContentTrendData] = useState(null);
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedType, setSelectedType] = useState('Total');
    const [sliderYear, setSliderYear] = useState(2000);
  const [isLoading, setIsLoading] = useState(true);
    const mockPopularCategories = [
        { "Category": "Action & Adventure", "Percentage": 32 },
        { "Category": "Drama", "Percentage": 28 },
        { "Category": "Comedy", "Percentage": 24 },
    ];

    const mockViewingMetrics = {
        averageWatchTime: "2.5 hrs",
        completionRate: "76%",
    };
    const mockContentQuality = {
      userRating: "4.2/5.0",
        criticScore: "78%"
    }
      const mockContentAnalysis = {
         totalContent: "12,458",
          movies: "8,234",
          tvShows: "4,224",
          newReleases: "+342",
        contentDistribution :[
          { label: 'Movies', percentage: 66 },
            {label: 'TV Shows', percentage: 34},
        ]
    }

      const mockReleaseTimeline = [
          { "Year": "2018", "Count": 300 },
          { "Year": "2019", "Count": 350 },
         { "Year": "2020", "Count": 420 },
          { "Year": "2021", "Count": 400 },
           { "Year": "2022", "Count": 380 },
            { "Year": "2023", "Count": 350 },
      ]


  useEffect(() => {
      const fetchData = async () => {
          setIsLoading(true);
          try {
              const response = await fetchContentTrend();
              setContentTrendData(response);
        } catch(error){
            console.log("Error fetching data: ", error);
        } finally{
           setIsLoading(false);
        }
     };
     fetchData();
   }, []);

    const handleYearChange = (e) => {
      setSelectedYear(parseInt(e.target.value) || 'all');
    };
      const handleSliderYearChange = (year) => {
          setSliderYear(year)
      }
    const handleTypeChange = (type) => {
      setSelectedType(type);
    }


    if (isLoading) {
        return <Loading />;
    }
      const getReleaseTimeline = () => {
          if (selectedType === 'Total') {
              return filterDataByYear(mockReleaseTimeline, "Year", selectedYear)
          }
          if(selectedType === 'Movie') {
            const result = mockReleaseTimeline.map(item => ({...item, "Count": parseInt(item.Count *0.75)}))
             return filterDataByYear(result, "Year", selectedYear)
         }
         if(selectedType === 'TV Show') {
            const result = mockReleaseTimeline.map(item => ({...item, "Count": parseInt(item.Count *0.25)}))
            return filterDataByYear(result, "Year", selectedYear)
         }
      }

    const contentDistributionForPieChart = mockContentAnalysis.contentDistribution.map(item => ({ M_rating: item.label, counts: item.percentage}));
    const releaseTimelineForBarChart = getReleaseTimeline()
     const popularCategoriesForBarChart = mockPopularCategories.map(item => ({ Category: item.Category, Percentage: item.Percentage}))
      const minYear = contentTrendData ? Math.min(...contentTrendData.map(item => item['Release Year'])) : 2000;
    const maxYear = contentTrendData ? Math.max(...contentTrendData.map(item => item['Release Year'])) : 2021;

     const getMovieVsTvData = () => {
        const data = filterDataByYear(mockReleaseTimeline, "Year", selectedYear);
         return data.map(item => ({...item, Movies: parseInt(item.Count*0.75), "TV Shows": parseInt(item.Count*0.25)}))
     }
        const movieVsTvData = getMovieVsTvData();
         const minSliderYear =  movieVsTvData.length ? Math.min(...movieVsTvData.map(item => parseInt(item.Year))) : 2000;
    const maxSliderYear = movieVsTvData.length ? Math.max(...movieVsTvData.map(item => parseInt(item.Year))) : 2021;
    const filteredMovieVsTvData = movieVsTvData.filter(item => parseInt(item.Year) === sliderYear);
  return (
       <div className="container mx-auto p-4">
         <h2 className="text-2xl font-semibold mb-4">Content Analysis</h2>
            <p className="text-gray-600 mb-6">Comprehensive overview of Netflix content performance and trends</p>
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
                              onClick={() => handleTypeChange('Total')}
                             className={`rounded-md px-3 py-1 text-sm ${ selectedType==='Total' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}
                          >
                             Total
                        </button>
                        <button
                              onClick={() => handleTypeChange('Movie')}
                            className={`rounded-md px-3 py-1 text-sm ml-2 ${ selectedType==='Movie' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
                            Movies
                      </button>
                       <button
                              onClick={() => handleTypeChange('TV Show')}
                            className={`rounded-md px-3 py-1 text-sm ml-2 ${ selectedType==='TV Show' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
                            TV Shows
                      </button>
                   </div>
                 </div>


            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white shadow rounded p-4">
                       <h3 className="text-gray-500 text-sm">Total Content</h3>
                       <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.totalContent}</p>
                       <p className="text-sm text-gray-500">Active Titles</p>
                    </div>
                   <div className="bg-white shadow rounded p-4">
                       <h3 className="text-gray-500 text-sm">Movies</h3>
                      <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.movies}</p>
                      <p className="text-sm text-gray-500">Total Films</p>
                   </div>
                    <div className="bg-white shadow rounded p-4">
                      <h3 className="text-gray-500 text-sm">TV Shows</h3>
                         <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.tvShows}</p>
                         <p className="text-sm text-gray-500">Series & Shows</p>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                       <h3 className="text-gray-500 text-sm">New Releases</h3>
                      <p className="text-3xl font-bold text-gray-800">{mockContentAnalysis.newReleases}</p>
                        <p className="text-sm text-gray-500">This Month</p>
                    </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                 <div className="bg-white shadow rounded p-4">
                   <h3 className="text-lg font-semibold mb-4">Content Distribution by Type</h3>
                       <PieChart data={contentDistributionForPieChart} />
                  </div>

                  <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-4">Release Timeline</h3>
                      <div className="relative">
                         <BarChart data={releaseTimelineForBarChart} xKey="Year" yKey="Count"  />
                      </div>

                  </div>
            </div>
       <div className="mb-8">
            <ChartCard title="Movie vs TV Shows">
             <YearSlider minYear={minSliderYear} maxYear={maxSliderYear} onChange={handleSliderYearChange} />
             <BarChart data={filteredMovieVsTvData}  xKey="Year" yKey="Movies" orientation="h" />
                  <BarChart data={filteredMovieVsTvData}  xKey="Year" yKey="TV Shows" orientation="h" />
            </ChartCard>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
               <div className="bg-white shadow rounded p-4">
                  <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
                     <div className="flex items-center justify-between text-gray-700">
                       {popularCategoriesForBarChart.map(item => (
                           <div className="flex flex-col items-center" >
                                <div className="bg-blue-300 h-6 rounded-b-md" style={{width: "100%", height: `${item.Percentage}px`, }}> </div>
                             <span className="text-sm">{item.Category}</span>
                           </div>
                         ))}
                   </div>
              </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-4">Viewing Metrics</h3>
                     <p className="text-xl font-semibold text-gray-700">{mockViewingMetrics.averageWatchTime}</p>
                      <p className="text-sm text-green-500">↑ 12% vs last month</p>
                      <p className="text-xl font-semibold text-gray-700 mt-2">{mockViewingMetrics.completionRate}</p>
                        <p className="text-sm text-green-500">↑ 5% vs last month</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                     <h3 className="text-lg font-semibold mb-4">Content Quality</h3>
                      <div className="mb-2">
                           <p className="font-semibold">User Rating</p>
                            <div className="bg-gray-300 rounded-full h-2 w-full">
                            <div className="bg-blue-500 rounded-full h-2" style={{ width: `${parseFloat(mockContentQuality.userRating.split('/')[0]) /5 *100}%` }}></div>
                          </div>
                         <span className="text-gray-700 text-sm">{mockContentQuality.userRating}</span>
                      </div>
                       <div className="mb-2">
                             <p className="font-semibold">Critic Score</p>
                              <div className="bg-gray-300 rounded-full h-2 w-full">
                                <div className="bg-green-500 rounded-full h-2" style={{ width: mockContentQuality.criticScore }}></div>
                            </div>
                            <span className="text-gray-700 text-sm">{mockContentQuality.criticScore}</span>
                        </div>

                </div>
         </div>
     </div>
  );
};

export default ContentTrend;
=======
import { useEffect, useMemo, useState } from 'react';
import {
  CalendarRange,
  Clapperboard,
  Layers,
  Sparkles,
  TrendingUp,
  Tv,
} from 'lucide-react';
import { fetchContentTrend } from '../api';
import BarChart from '../components/BarChart';
import ChartCard from '../components/ChartCard';
import FilterSelect from '../components/FilterSelect';
import GroupedBarChart from '../components/GroupedBarChart';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import PieChart from '../components/PieChart';
import ProgressList from '../components/ProgressList';
import SegmentedControl from '../components/SegmentedControl';
import StatCard from '../components/StatCard';
import { formatNumber, formatPercent } from '../utils';

const mockPopularCategories = [
  { Category: 'Action & Adventure', Percentage: 32 },
  { Category: 'Drama', Percentage: 28 },
  { Category: 'Comedy', Percentage: 24 },
];

const mockViewingMetrics = {
  averageWatchTime: '2.5 hrs',
  completionRate: '76%',
};

const mockContentQuality = {
  userRating: '4.2/5.0',
  criticScore: '78%',
};

const aggregateByYear = (rows) => {
  const map = new Map();

  rows.forEach((item) => {
    const year = item['Release Year'];
    if (year === undefined || year === null) return;

    if (!map.has(year)) {
      map.set(year, { Year: year, Movies: 0, 'TV Shows': 0, Total: 0 });
    }

    const entry = map.get(year);
    const count = Number(item['Total Count']) || 0;

    if (item.Type === 'Movie') entry.Movies += count;
    else if (item.Type === 'TV Show') entry['TV Shows'] += count;
    entry.Total += count;
  });

  return [...map.values()].sort((a, b) => Number(a.Year) - Number(b.Year));
};

const ContentTrend = () => {
  const [contentTrendData, setContentTrendData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('Total');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchContentTrend();
        if (active) setContentTrendData(response ?? []);
      } catch (error) {
        console.error('Error fetching content trend:', error);
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
      [...new Set(contentTrendData.map((item) => item['Release Year']))].sort(
        (a, b) => Number(b) - Number(a)
      ),
    [contentTrendData]
  );

  const yearOptions = useMemo(
    () => [
      { value: 'all', label: 'All years' },
      ...years.map((year) => ({ value: String(year), label: String(year) })),
    ],
    [years]
  );

  const yearRows = useMemo(
    () =>
      selectedYear === 'all'
        ? contentTrendData
        : contentTrendData.filter((item) => item['Release Year'] === Number(selectedYear)),
    [contentTrendData, selectedYear]
  );

  const stats = useMemo(() => {
    const aggregate = aggregateByYear(yearRows);
    const movies = aggregate.reduce((sum, item) => sum + item.Movies, 0);
    const tvShows = aggregate.reduce((sum, item) => sum + item['TV Shows'], 0);
    const total = movies + tvShows;

    const allYears = aggregateByYear(contentTrendData);
    const peak = allYears.reduce(
      (best, item) => (item.Total > (best?.Total ?? 0) ? item : best),
      null
    );

    return {
      movies,
      tvShows,
      total,
      movieShare: total ? (movies / total) * 100 : 0,
      peakYear: peak?.Year ?? '—',
      peakTotal: peak?.Total ?? 0,
    };
  }, [yearRows, contentTrendData]);

  const releaseTimeline = useMemo(
    () =>
      aggregateByYear(yearRows).map((item) => ({
        Year: item.Year,
        Count:
          selectedType === 'Movie'
            ? item.Movies
            : selectedType === 'TV Show'
            ? item['TV Shows']
            : item.Total,
      })),
    [yearRows, selectedType]
  );

  const movieVsTvData = useMemo(() => aggregateByYear(contentTrendData), [contentTrendData]);

  const typeForPieChart = useMemo(
    () =>
      stats.total
        ? [
            { M_rating: 'Movies', counts: stats.movies },
            { M_rating: 'TV Shows', counts: stats.tvShows },
          ]
        : [],
    [stats.movies, stats.tvShows, stats.total]
  );

  const categoryItems = mockPopularCategories.map((item) => ({
    label: item.Category,
    value: item.Percentage,
    display: `${item.Percentage}%`,
  }));

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catalog"
        title="Content analysis"
        description="Understand how the Netflix library has grown, what share each format owns, and where release momentum is concentrated."
      >
        <FilterSelect
          label="Year"
          icon={CalendarRange}
          value={selectedYear}
          onChange={(event) => setSelectedYear(event.target.value)}
          options={yearOptions}
          ariaLabel="Filter content by release year"
        />
        <SegmentedControl
          value={selectedType}
          onChange={setSelectedType}
          ariaLabel="Content type"
          options={[
            { value: 'Total', label: 'All' },
            { value: 'Movie', label: 'Movies' },
            { value: 'TV Show', label: 'TV Shows' },
          ]}
        />
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          index={0}
          label="Total titles"
          value={formatNumber(stats.total)}
          sublabel={selectedYear === 'all' ? 'Full catalog' : `Released in ${selectedYear}`}
          icon={Layers}
          tone="red"
        />
        <StatCard
          index={1}
          label="Movies"
          value={formatNumber(stats.movies)}
          sublabel={`${formatPercent(stats.movieShare, 1)} of selection`}
          icon={Clapperboard}
          tone="violet"
        />
        <StatCard
          index={2}
          label="TV shows"
          value={formatNumber(stats.tvShows)}
          sublabel={`${formatPercent(100 - stats.movieShare, 1)} of selection`}
          icon={Tv}
          tone="cyan"
        />
        <StatCard
          index={3}
          label="Peak release year"
          value={stats.peakYear}
          sublabel={`${formatNumber(stats.peakTotal)} titles at peak`}
          icon={TrendingUp}
          tone="emerald"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <ChartCard
          className="xl:col-span-2"
          index={1}
          title="Release timeline"
          subtitle="Titles released per year for the selected format"
          action={
            <span className="chip">
              <Sparkles size={12} className="text-brand-soft" />
              {selectedType === 'Total' ? 'All formats' : selectedType === 'Movie' ? 'Movies' : 'TV shows'}
            </span>
          }
        >
          <BarChart data={releaseTimeline} xKey="Year" yKey="Count" height={330} />
        </ChartCard>

        <ChartCard
          index={2}
          title="Format split"
          subtitle="Movies versus TV shows in the current selection"
        >
          <PieChart data={typeForPieChart} height={330} />
        </ChartCard>
      </div>

      <ChartCard
        index={1}
        title="Movie vs TV show output"
        subtitle="Full catalog comparison by release year"
      >
        <GroupedBarChart
          data={movieVsTvData}
          xKey="Year"
          series={[
            { key: 'Movies', name: 'Movies', color: '#e50914' },
            { key: 'TV Shows', name: 'TV Shows', color: '#22d3ee' },
          ]}
          height={330}
        />
      </ChartCard>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard index={1} title="Popular categories" subtitle="Share of catalog by genre">
          <ProgressList items={categoryItems} className="pt-2" />
        </ChartCard>

        <ChartCard index={2} title="Viewing metrics" subtitle="Engagement snapshot">
          <div className="space-y-6 pt-2">
            <div>
              <p className="font-display text-3xl font-extrabold text-white">
                {mockViewingMetrics.averageWatchTime}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Average watch time per session</p>
              <p className="mt-1.5 text-[11px] font-semibold text-emerald-300">
                ↑ 12% vs last month
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Completion rate</span>
                <span className="font-semibold text-white">{mockViewingMetrics.completionRate}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  style={{ width: mockViewingMetrics.completionRate }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-zinc-500">↑ 5% vs last month</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard index={3} title="Content quality" subtitle="Audience and critic scores">
          <div className="space-y-6 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">User rating</span>
                <span className="font-semibold text-white">{mockContentQuality.userRating}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-rose-400"
                  style={{
                    width: `${(parseFloat(mockContentQuality.userRating) / 5) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Critic score</span>
                <span className="font-semibold text-white">{mockContentQuality.criticScore}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                  style={{ width: mockContentQuality.criticScore }}
                />
              </div>
            </div>
            <p className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-[11px] leading-relaxed text-zinc-500">
              Quality signals stay consistently strong across both audience and critic cohorts.
            </p>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default ContentTrend;
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
