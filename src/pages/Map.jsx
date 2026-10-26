<<<<<<< HEAD
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = () => {
    const [timeSliderValue, setTimeSliderValue] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentDate, setCurrentDate] = useState("2021-01-20 00:00:00");
  const [activeCountry, setActiveCountry] = useState(null);

    const mockData = {
        mapTitle: "Geospatial Visualization of Netflix Content",
        mapDescription: "Spread of Content Globally Over Time",
    };
    const mockMapData = {
         "Nepal": 200,
        "Indonesia": 300,
         "India": 150,
        "China": 400,
       "United States": 500,
         "Canada": 250,
        "Brazil": 350,
         "United Kingdom": 450,
         "France": 200,
        "Germany": 300,
        "Japan": 350,
        "Australia": 200,
    };


  const handleCountryClick = (country) => {
      setActiveCountry(country.properties.name);
  };
    const handlePlay = () => {
        setIsPlaying(true);
        const interval = setInterval(() => {
            setTimeSliderValue(prev => {
                const newValue = prev + 1;
                if (newValue > 100) {
                    clearInterval(interval);
                    setIsPlaying(false);
                    return 0;
                }
                setCurrentDate(new Date(new Date('2021-01-20 00:00:00').getTime() + (new Date('2023-03-09 00:00:00').getTime() - new Date('2021-01-20 00:00:00').getTime()) * (newValue / 100)  ).toLocaleString())
                return newValue;
            });
        }, 500);
    };
    const handlePause = () => {
        setIsPlaying(false);
    };
     const handleSliderChange = (e) => {
        setTimeSliderValue(parseInt(e.target.value));
           setCurrentDate(new Date(new Date('2021-01-20 00:00:00').getTime() + (new Date('2023-03-09 00:00:00').getTime() - new Date('2021-01-20 00:00:00').getTime()) * (parseInt(e.target.value) / 100)  ).toLocaleString())
    }
    const calculateColor = (countryName) => {
       const count = mockMapData[countryName] || 0;
      const maxCount = 500;
      const normalizedCount = Math.min(count / maxCount, 1);
        const shade = Math.round(normalizedCount * 255);
     return `rgb( ${shade}, ${shade}, ${shade})`;
    };
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4"> {mockData.mapTitle} </h2>
            <p className="text-gray-600 mb-6"> {mockData.mapDescription}</p>

            <div className="bg-gray-800 p-4 rounded-md shadow-md mb-8">
                <div className="flex items-center justify-center">
                    <div className="w-1/6 flex justify-end">
                        <button onClick={handlePlay} className="bg-gray-600 text-white p-2 rounded-md">
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132a1 1 0 00-1.554.168l-3.197 2.132a1 1 0 000 1.664l3.197 2.132a1 1 0 001.554.168l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <button onClick={handlePause} className="bg-gray-600 text-white p-2 rounded-md ml-2">
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>

                    </div>
                    <div className="flex items-center w-4/6">
                         <span className="text-sm text-white">Date: {currentDate} </span>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={timeSliderValue}
                            onChange={handleSliderChange}
                            className="mx-4 flex-1" />
                    </div>

                    <div className="w-1/6 text-white flex justify-start">
                           <span className="text-sm">2021-01-20 00:00:00</span>
                          <span className="text-sm ml-1">2023-03-09</span>
                   </div>
                </div>

               <div style={{height: "400px"}}  className=" mt-4  text-white">

                 <ComposableMap projection="geoMercator"  style={{width: "100%", height: "100%"}} >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => {
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                         geography={geo}
                                         fill={calculateColor(geo.properties.name)}
                                           stroke="#D6D6DA"
                                         strokeWidth={0.5}
                                          onClick={() => handleCountryClick(geo)}

                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
                     {activeCountry && <div className="absolute top-0 left-0 bg-gray-700 rounded-md p-2">{activeCountry}</div>}
                   </div>
            </div>
            </div>
    );
};

export default Map;
=======
import { useEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { CalendarRange, Globe2, MapPin, Pause, Play, TrendingUp } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { formatNumber } from '../utils';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const mockMapData = {
  Nepal: 200,
  Indonesia: 300,
  India: 150,
  China: 400,
  'United States of America': 500,
  Canada: 250,
  Brazil: 350,
  'United Kingdom': 450,
  France: 200,
  Germany: 300,
  Japan: 350,
  Australia: 200,
};

const startDate = new Date('2021-01-20 00:00:00');
const endDate = new Date('2023-03-09 00:00:00');
const maxCount = Math.max(...Object.values(mockMapData));

const dateForValue = (value) =>
  new Date(startDate.getTime() + (endDate.getTime() - startDate.getTime()) * (value / 100))
    .toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

const Map = () => {
  const [timeSliderValue, setTimeSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDate, setCurrentDate] = useState(dateForValue(0));
  const [activeCountry, setActiveCountry] = useState(null);
  const intervalRef = useRef(null);

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    },
    []
  );

  const markets = useMemo(
    () =>
      Object.entries(mockMapData)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
    []
  );

  const handlePlay = () => {
    if (intervalRef.current) return;
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setTimeSliderValue((previous) => {
        const next = previous + 1;
        if (next > 100) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsPlaying(false);
          setCurrentDate(dateForValue(0));
          return 0;
        }
        setCurrentDate(dateForValue(next));
        return next;
      });
    }, 500);
  };

  const handlePause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleSliderChange = (event) => {
    const value = Number(event.target.value);
    setTimeSliderValue(value);
    setCurrentDate(dateForValue(value));
  };

  const fillForCountry = (countryName) => {
    const count = mockMapData[countryName] || 0;
    if (!count) return '#1b1b24';
    const intensity = Math.min(count / maxCount, 1);
    return `rgba(229, 9, 20, ${0.22 + intensity * 0.78})`;
  };

  if (!markets.length) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Geography"
        title="Content footprint"
        description="Watch how Netflix's catalog spreads across markets over time, then explore the strongest regional signals."
      >
        <span className="chip">
          <Globe2 size={12} className="text-cyan-300" />
          {markets.length} markets
        </span>
        <span className="chip">
          <CalendarRange size={12} className="text-zinc-500" />
          {dateForValue(timeSliderValue)}
        </span>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          index={0}
          label="Markets tracked"
          value={markets.length}
          sublabel="Across the globe"
          icon={Globe2}
          tone="cyan"
        />
        <StatCard
          index={1}
          label="Peak market"
          value={markets[0]?.name ?? '—'}
          sublabel={`${markets[0]?.count ?? 0} titles`}
          icon={TrendingUp}
          tone="red"
        />
        <StatCard
          index={2}
          label="Total signals"
          value={formatNumber(Object.values(mockMapData).reduce((sum, value) => sum + value, 0))}
          sublabel="Regional content events"
          icon={MapPin}
          tone="violet"
        />
      </div>

      <ChartCard
        index={1}
        title="Global content spread"
        subtitle="Darker regions indicate a higher concentration of titles"
      >
        <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900/60">
          <div style={{ height: 440 }} className="relative">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 128, center: [0, 18] }}
              style={{ width: '100%', height: '100%' }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;
                    const isActive = activeCountry?.name === countryName;
                    const count = mockMapData[countryName] || 0;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isActive ? '#ff3d4d' : fillForCountry(countryName)}
                        stroke="#2a2a36"
                        strokeWidth={0.4}
                        onClick={() =>
                          setActiveCountry(count > 0 ? { name: countryName, count } : null)
                        }
                        style={{
                          default: { outline: 'none', transition: 'fill 200ms ease' },
                          hover: {
                            outline: 'none',
                            fill: '#ff3d4d',
                            cursor: count > 0 ? 'pointer' : 'default',
                          },
                          pressed: { outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>

            {activeCountry && (
              <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-ink-850/95 px-4 py-3 shadow-card backdrop-blur-xl animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <MapPin size={13} className="text-brand-soft" />
                  {activeCountry.name}
                </div>
                <p className="mt-1 text-[11px] text-zinc-500">
                  {activeCountry.count} content signals
                </p>
              </div>
            )}

            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg border border-white/10 bg-ink-850/90 px-3 py-2 backdrop-blur-xl">
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                Low
              </span>
              <span className="h-1.5 w-24 rounded-full bg-gradient-to-r from-brand/20 via-brand/60 to-brand" />
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                High
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePlay}
                disabled={isPlaying}
                aria-label="Play timeline"
                className="grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient text-white shadow-glow-soft transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Play size={15} fill="currentColor" />
              </button>
              <button
                type="button"
                onClick={handlePause}
                disabled={!isPlaying}
                aria-label="Pause timeline"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Pause size={15} />
              </button>
              <span className="ml-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] font-semibold text-white">
                {currentDate}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={timeSliderValue}
              onChange={handleSliderChange}
              aria-label="Timeline position"
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-brand"
            />

            <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-600">
              2021 → 2023
            </span>
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

export default Map;
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
