import React, { useEffect, useState, useMemo } from "react";
import ReactGlobe from "react-globe.gl";
import * as d3 from "d3";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const dates = [
  "2020-01-01_map.json",
  "2020-03-01_map.json",
  "2020-06-01_map.json",
  "2020-09-01_map.json",
  "2020-12-01_map.json",
  "2021-03-01_map.json",
  "2021-06-01_map.json",
  "2021-09-01_map.json",
  "2021-12-01_map.json",
  "2022-03-01_map.json"
]

const MaterialUISwitch = styled(Switch)(({ theme }  : any) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

function Globe() {
  const [countries, setCountries] = useState({ 
    features: [], 
    total_cases: 0,
    people_fully_vaccinated: 0,
    world_population: 0,
  });
  const [hoverD, setHoverD] = useState();  
  const [currentIndex, setCurrentDate] = useState(dates.length-1);
  const [vaccineEnabled, setVaccine] = useState(true);
  const [globe, setGlobe] = useState();

  useEffect(() => {
    // load data
    fetch('maps/2022-03-01_map.json')
    .then(res => res.json())
    .then(setCountries)
    .catch((e) => console.error(e));
  }, []);

  async function getMap(map : string) {
    console.log("here")
    const path = "maps/" + map 
    console.log(path)
    fetch(path)
    .then(res => res.json())
    .then(setCountries)
    .catch((e) => console.error(e));
  }

  async function wrapper(map : string) {
    await getMap(map)
  }

  function valuetext(index: number) {
    if (currentIndex == index) {
      return ""
    }
    return `${dates[index]}`;
  }

  const handleChange = (event: Event, newIndex: number | number[]) => {
    if (newIndex != currentIndex) {
      setCurrentDate(newIndex as number);
      const newDate = dates[newIndex as number];
      console.log(newDate)
      wrapper(newDate)
    }
  }

  function valueLabelFormat(value: number) {
    const dateString = dates[value].split('_')[0];
    return `${dateString}`;
  }

  const vaccineHandle = () => {
    const state = !vaccineEnabled;
    console.log(vaccineEnabled, state)
    console.log(state, "here")
    setVaccine(state)
  }

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateReds);
  const colorScaleBlue = d3.scaleSequentialSqrt(d3.interpolateBlues);

  // Calculate Covid Cases Density
  const getVal = (feat : any) => feat.properties.total_cases / Math.max(1, feat.properties.POP_EST);

  // Get Vac Rates
  const getValVacs = (feat : any) => feat.properties.people_fully_vaccinated / Math.max(1, feat.properties.POP_EST);
  
  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );

  if (maxVal > 0) {
    colorScale.domain([0, maxVal]);
  }

  const totalCases = countries.total_cases
  const percentVaccinated = (countries.people_fully_vaccinated / countries.world_population * 100).toFixed(0)

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
          polygonLabel={({ properties: d } : any) => `
          <b>${d.ADMIN} (${d.ISO_A3}):</b> <br />
          Total Cases: <i>${d.total_cases}</i><br/>
          Total Vaccinated: <i>${(d.people_fully_vaccinated/d.POP_EST * 100).toFixed(0)}%</i>
        `}
  
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
          polygonLabel={({ properties: d } : any) => `
          <b>${d.ADMIN} (${d.ISO_A3}):</b> <br />
          Total Cases: <i>${d.total_cases}</i><br/>
          Total Vaccinated: <i>${(d.people_fully_vaccinated/d.POP_EST * 100).toFixed(0)}%</i>
        `}
  
          // onPolygonHover={(setHoverD)}
          polygonsTransitionDuration={300}
        />
      }
      </div>
      <p className="statsOverview">Total Cases: {totalCases} &emsp;&emsp; Population Vaccinated: {percentVaccinated}%</p>
      <Box className="Slider" sx={{ width: 300 }}>
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
        <FormControlLabel
          className="toggle"
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
          label="Vaccine Toggle"
          onChange={vaccineHandle}
        />
    </div>

  );
}

export default Globe;

