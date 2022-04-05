import React, { useEffect, useState, useMemo } from "react";
import ReactGlobe from "react-globe.gl";
import * as d3 from "d3";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const dates = [
  "2020-03-01_map.json",
  "2021-03-01_map.json",
  "2022-03-01_map.json"
]

function Globe() {
  const [countries, setCountries] = useState({ features: []});
  const [hoverD, setHoverD] = useState();  
  const [currentIndex, setCurrentDate] = useState(dates.length-1);
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
  colorScale.domain([0, maxVal]);


  return (
    <div className="Wrapper">
      <div className="Globe">
        <ReactGlobe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        // lineHoverPrecision={0}

        hexPolygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
        hexPolygonResolution={3}
        hexPolygonMargin={0.5}
        hexPolygonAltitude={0.18}
        hexPolygonColor={d => d === hoverD ? 'steelblue' : colorScaleBlue(getValVacs(d))}
        hexPolygonLabel={({ properties: d } : any) => `
          <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
          Total Cases: <i>${d.total_cases}</i><br/>
          Total Vaccinated: <i>${d.people_fully_vaccinated}</i>
        `}
        
        polygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
        polygonAltitude={0.1}
        polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
        polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
        polygonStrokeColor={() => '#111'}

        // onPolygonHover={(setHoverD)}
        polygonsTransitionDuration={300}
      />
      </div>
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
    </div>

  );
}

export default Globe;
