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
  const [currentIndex, setCurrentDate] = useState(2);
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
    index -= 1
    if (currentIndex == index) {
      return ""
    }
    console.log(index)
    const newDate = dates[index]
    setCurrentDate(index)
    wrapper(newDate)
    return `${index}°C`;
  }
  

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  // Calculate Global Population Density
  const getVal = (feat : any) => feat.properties.total_cases / Math.max(1, feat.properties.POP_EST);

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );
  colorScale.domain([0, maxVal]);
  
  return (
    <div className="wrapper">
      <div className="Globe">
        <ReactGlobe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        // lineHoverPrecision={0}

        polygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
        polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
        polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonStrokeColor={() => '#111'}
        polygonLabel={({ properties: d } : any) => `
          <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
          Total Cases: <i>${d.total_cases}</i><br/>
          Total Vaccinated: <i>${d.people_fully_vaccinated}</i>
        `}
        // onPolygonHover={(setHoverD)}
        polygonsTransitionDuration={300}
      />
      </div>
      <Box className="Slider" sx={{ width: 300 }}>
        <Slider
          className="Slider"
          aria-label="Temperature"
          defaultValue={30}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={3}
        />
      </Box>
    </div>

  );
}

export default Globe;
