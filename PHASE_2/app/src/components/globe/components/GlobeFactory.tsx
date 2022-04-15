import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactGlobe from "react-globe.gl";
import { getPolygonLabel, getValVacs } from "./GlobleFunctions"
import * as d3 from "d3"

interface props {
    vaccineEnabled : boolean
    countries : any
    dateData : any
    activeCountries: Array<string>
    setActiveCountries: (countries: Array<string>) => void
}

/**
 * Plan
 *  - Right click country
 *  - Adds country to state list of "active countries"
 *  - For each country in the country list, elevate level
 *  - Render Globe
 * 
 *  - If right clicked and in list then remove country
 *  - Render globe accordingly
 * 
 *  - Function - one for elevate 
 */

interface top_layer {
  hexPolygonAltitude : any
  hexPolygonsData : any
  hexPolygonResolution : any
  hexPolygonColor : any
  hexPolygonMargin : any
}

export const GlobeFactory : React.FC<props> = ({vaccineEnabled, countries, dateData, activeCountries, setActiveCountries}) => {
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

    const elevateCountries = (polygon : any ) => {
      const country = polygon.properties.NAME

      if (!country){
        return
      }
      if (activeCountries.includes(country)) {
        const newActiveCountries = activeCountries.filter((x) => {
          return x != country
        });
        setActiveCountries([...newActiveCountries])
      } else {
        console.log("adding country")
        let newActiveCountries = activeCountries
        newActiveCountries.push(country)
        console.log(newActiveCountries)
        setActiveCountries([...newActiveCountries])
      }
    }
    if (maxVal > 0) {
        colorScale.domain([0, maxVal]);
    }
    if (activeCountries.length > 0) {
      if (vaccineEnabled) {
        return (
        <ReactGlobe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            // lineHoverPrecision={0}
  
            hexPolygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
            hexPolygonResolution={3}
            hexPolygonMargin={0.5}
            hexPolygonAltitude={(feat : any) => {
              console.log("here")
              const name = feat.properties.SOVEREIGNT
              if (activeCountries.includes(name)){
                return 0.84
              }
              return 0.1
            }}            
            hexPolygonColor={d => d === hoverD ? 'steelblue' : colorScaleBlue(getValVacs(d, dateData))}
            
            polygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
            polygonAltitude={(feat : any) => { 
              const name = feat.properties.SOVEREIGNT
              if (activeCountries.includes(name)){
                return 0.8
              }
              return 0.1
            }}            polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
            polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
            polygonStrokeColor={() => '#111'}
            polygonLabel={({ properties: d } : any) => getPolygonLabel(d, dateData)}
            polygonsTransitionDuration={300}
            onPolygonRightClick={(polygon: any, _event: MouseEvent) => {elevateCountries(polygon)}}
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
              polygonAltitude={(feat : any) => { 
                const name = feat.properties.SOVEREIGNT
                if (activeCountries.includes(name)){
                  return 0.8
                }
                return 0.1
              }}
              polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
              polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
              polygonStrokeColor={() => '#111'}
              polygonLabel={({ properties: d } : any) => getPolygonLabel(d, dateData)}
              polygonsTransitionDuration={300}
              onPolygonRightClick={(polygon: any, _event: MouseEvent) => {elevateCountries(polygon)}}
            />
        )
      }
    }
    else if (vaccineEnabled) {
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
            onPolygonRightClick={(polygon: any, _event: MouseEvent) => {elevateCountries(polygon)}}
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
                onPolygonRightClick={(polygon: object, _event: MouseEvent) => {elevateCountries(polygon)}}
            />
        )
    }
}