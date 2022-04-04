import React, { useEffect, useState, useMemo } from "react";
import ReactGlobe from "react-globe.gl";
import * as d3 from "d3";

function Globe() {
  const [countries, setCountries] = useState({ features: []});
  const [hoverD, setHoverD] = useState();  
  useEffect(() => {
    // load data
    fetch('output_single_map.json')
    .then(res => res.json())
    .then(setCountries)
    .catch((e) => console.error(e));
  }, []);

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  // GDP per capita (avoiding countries with small pop)
  const getVal = (feat : any) => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );
  colorScale.domain([0, maxVal]);
  
  return (
    <div className="Globe">
      <ReactGlobe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      // lineHoverPrecision={0}

      // polygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
      polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
      polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={({ properties: d } : any) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
        GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
        Population: <i>${d.POP_EST}</i>
      `}
      // onPolygonHover={(setHoverD)}
      polygonsTransitionDuration={300}
    />
    </div>
  );
}

export default Globe;
