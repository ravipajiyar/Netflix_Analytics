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