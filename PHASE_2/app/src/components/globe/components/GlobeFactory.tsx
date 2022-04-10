import React, { useState, useMemo } from "react";
import ReactGlobe from "react-globe.gl";
import { getPolygonLabel, getValVacs } from "./GlobleFunctions"
import * as d3 from "d3"

interface props {
    vaccineEnabled : boolean
    countries : any
    dateData : any
}


export const GlobeFactory : React.FC<props> = ({vaccineEnabled, countries, dateData}) => {
    const colorScale = d3.scaleSequentialSqrt(d3.interpolateReds);
    const colorScaleBlue = d3.scaleSequentialSqrt(d3.interpolateBlues);
    const [hoverD, setHoverD] = useState();  
  
    const getVal = (d : any) => {
      let iso_code = d.properties.ISO_A3
      let country = dateData.country_stats.find((c : any) => c.iso_code === iso_code);
      if (country){
        return country.properties.total_cases / Math.max(1, country.properties.population);
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
    if (vaccineEnabled) {
        return (
        <ReactGlobe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            // lineHoverPrecision={0}
  
            hexPolygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
            hexPolygonResolution={3}
            hexPolygonMargin={0.5}
            hexPolygonAltitude={0.14}
            hexPolygonColor={d => d === hoverD ? 'steelblue' : colorScaleBlue(getValVacs(d, dateData))}
            
            
            polygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
            polygonAltitude={0.1}
            polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
            polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
            polygonStrokeColor={() => '#111'}
            polygonLabel={({ properties: d } : any) => getPolygonLabel(d, dateData)}
            polygonsTransitionDuration={300}
          />
        )
    } else {
        return (
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
                polygonLabel={({ properties: d } : any) => getPolygonLabel(d, dateData)}    
                polygonsTransitionDuration={300}
            />
        )
    }
}