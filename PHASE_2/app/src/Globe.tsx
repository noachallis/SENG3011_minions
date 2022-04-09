import React, { useEffect, useState, useMemo, useRef } from "react";
import ReactGlobe from "react-globe.gl";
import * as d3 from "d3";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled, } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaPlay, FaPause } from 'react-icons/fa';

import { translator } from './translator';
import { dates } from './dates';


function Globe() {
  const [countries, setCountries] = useState({ 
    features: []
  });
  const [dateData, setDateData] = useState({ 
    total_cases: 0,
    people_fully_vaccinated: 0,
    world_population: 0,
    country_stats: [{
      iso_code: '',
      properties: {
        total_cases: 0,
        people_fully_vaccinated: 0,
        total_vaccinations_per_hundred: 0,
        population: 0
      }
    }]
  });

  const [hoverD, setHoverD] = useState();  
  const [currentIndex, setCurrentDate] = useState(dates.length-1);
  const [vaccineEnabled, setVaccine] = useState(true);
  const [sliderPlaying, setsliderPlaying] = useState(false);
  const [globe, setGlobe] = useState();
  const intervalIdRef = useRef(0);
  const [language, setLanguage] = useState('en');


  useEffect(() => {
    // load map
    fetch('datasets/countries.geojson')
    .then(res => res.json())
    .then(setCountries)
    .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    // load data
    fetch('datasets/2022-03-01_map.json')
    .then(res => res.json())
    .then(setDateData)
    .catch((e) => console.error(e));
  }, []);
  

  async function getDateData(date : string) {
    const path = "datasets/" + date 
    fetch(path)
    .then(res => res.json())
    .then(setDateData)
    .catch((e) => console.error(e));
  }

  async function wrapper(date : string) {
    await getDateData(date)
  }

  function valuetext(index: number) {
    if (currentIndex == index) {
      return ""
    }
    return `${dates[index]}`;
  }

  const handleChange = (event: Event, newIndex: number | number[]) => {
    // check if slider is in motion
    if (sliderPlaying){
      setsliderPlaying(false)
    }
    if (newIndex != currentIndex) {
      setCurrentDate(newIndex as number);
      const newDate = dates[newIndex as number];
      wrapper(newDate)
    }
  }

  const handleChangeAuto = (index: number) => {
    let newIndex = (index + 1) % dates.length
    setCurrentDate(newIndex as number);
    const newDate = dates[newIndex as number];
    wrapper(newDate)  
  }

  function valueLabelFormat(value: number) {
    const dateString = dates[value].split('_')[0];
    return `${dateString}`;
  }

  const vaccineHandle = () => {
    const state = !vaccineEnabled;
    setVaccine(state)
  }

const handlePlay = () => {
  setsliderPlaying(!sliderPlaying);
};

const getWord = (word : string) => {
  let phrases = translator.find((c : any) => c.lan === language)?.phrases;
  switch(word){
    case 'total_cases':
    return phrases?.total_cases
    break;
  case 'pop_vacced':
    return phrases?.pop_vacced
    break;
  }
};

useEffect(() => {
  let index = currentIndex
  if (sliderPlaying) {
    intervalIdRef.current = window.setInterval(() => {
      handleChangeAuto(index);
      index = (index + 1) % dates.length
    }, 250);

  }
  return () => clearInterval(intervalIdRef.current);
}, [sliderPlaying]);

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateReds);
  const colorScaleBlue = d3.scaleSequentialSqrt(d3.interpolateBlues);

  const getPolygonLabel = (d : any) => {
    let iso_code = d.ISO_A3
    let country = dateData.country_stats.find((c : any) => c.iso_code === iso_code);
    if (country){
      return (`
      <b>${d.ADMIN} (${d.ISO_A3}):</b> <br />
      Total Cases: <i>${country.properties.total_cases}</i><br/>
      Total Vaccinated: <i>${(country.properties.people_fully_vaccinated/country.properties.population * 100).toFixed(0)}%</i>
      `)
    } else {
      return (`
      <b>${d.ADMIN} (${d.ISO_A3}):</b> <br />
      Total Cases: <i>0</i><br/>
      Total Vaccinated: <i>0%</i>
      `)
    }
  }
  // Calculate Covid Cases Density
  const getVal = (d : any) => {
    let iso_code = d.properties.ISO_A3
    let country = dateData.country_stats.find((c : any) => c.iso_code === iso_code);
    if (country){
      return country.properties.total_cases / Math.max(1, country.properties.population);
    } else {
      return 0
    }
  }
  // Get Vac Rates
  const getValVacs = (d : any) => {
    let iso_code = d.properties.ISO_A3
    let country = dateData.country_stats.find((c : any) => c.iso_code === iso_code);
    if (country){
      return country.properties.people_fully_vaccinated / Math.max(1, country.properties.population);
    } else {
      return 0
    }
  }
  
  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );

  if (maxVal > 0) {
    colorScale.domain([0, maxVal]);
  }

  const totalCases = dateData.total_cases
  const percentVaccinated = (dateData.people_fully_vaccinated / dateData.world_population * 100).toFixed(0)

  return (
    <div className="Wrapper">
      <div className="Globe">
        
      {vaccineEnabled ? 
        <ReactGlobe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          // lineHoverPrecision={0}

          hexPolygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
          hexPolygonResolution={3}
          hexPolygonMargin={0.5}
          hexPolygonAltitude={0.14}
          hexPolygonColor={d => d === hoverD ? 'steelblue' : colorScaleBlue(getValVacs(d))}
          
          
          polygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
          polygonAltitude={0.1}
          polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
          polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
          polygonStrokeColor={() => '#111'}
          polygonLabel={({ properties: d } : any) => getPolygonLabel(d)}
  
          // onPolygonHover={(setHoverD)}
          polygonsTransitionDuration={300}
        />
        :
        <ReactGlobe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          // lineHoverPrecision={0}
          
          hexPolygonsData={undefined}
          hexPolygonResolution={undefined}
          hexPolygonMargin={undefined}
          hexPolygonAltitude={undefined}
          hexPolygonColor={undefined}

          polygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
          polygonAltitude={0.1}
          polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
          polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
          polygonStrokeColor={() => '#111'}
          polygonLabel={({ properties: d } : any) => getPolygonLabel(d)}

          // onPolygonHover={(setHoverD)}
          polygonsTransitionDuration={300}
        />
      }
      </div>
      {/* <p className="statsOverview">Current Date: {currentIndex}</p> */}
      <p className="statsOverview">{getWord('total_cases')}: {totalCases} &emsp;&emsp; {getWord('pop_vacced')}: {percentVaccinated}%</p>
      <Box className="Slider" sx={{ width: 500 }}>
        <Box className="SliderLeft">
          <Slider
            aria-label="Time Selection Slider"
            className="Slider"
            sx = {{ color: "rgba(209, 13, 13, 0.8)"}}
            getAriaValueText={valuetext}
            defaultValue={dates.length-1}
            marks
            min={0}
            max={dates.length - 1}
            onChange={handleChange}
            step={1}
            value={currentIndex}
            valueLabelFormat={valueLabelFormat}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box className="SliderRight">
        {!sliderPlaying ?  
          <FaPlay color="white" onClick={handlePlay}> </FaPlay> :
          <FaPause color="white" onClick={handlePlay}> </FaPause>
        }
        </Box>
      </Box>
      <Box className="toggle">
        <FormControlLabel
          className="toggle"
          control={<Switch sx={{ m: 1 }} defaultChecked color="error"/>}
          label=""
          onChange={vaccineHandle}
        />
      </Box>  
      <Box className="flags">
        <div>
          <span className="flagEmoji" onClick={() => setLanguage("en")} aria-label="auFlag">🇬🇧</span>
          <span className="flagEmoji" onClick={() => setLanguage("cn")} aria-label="auFlag">🇨🇳</span>
          <span className="flagEmoji" onClick={() => setLanguage("es")} aria-label="auFlag">🇪🇸</span>
          <span className="flagEmoji" onClick={() => setLanguage("fr")} aria-label="frFlag">🇫🇷</span>
          <span className="flagEmoji" onClick={() => setLanguage("de")} aria-label="deFlag">🇩🇪</span>
          <span className="flagEmoji" onClick={() => setLanguage("kr")} aria-label="auFlag">🇰🇷</span>
          <span className="flagEmoji" onClick={() => setLanguage("jp")} aria-label="auFlag">🇯🇵</span>
          <span className="flagEmoji" onClick={() => setLanguage("hn")} aria-label="auFlag">🇮🇳</span>
        </div>
      </Box>
    </div>
  
  );
}

export default Globe;

