import React, { useState, useMemo} from "react";
import ReactGlobe from "react-globe.gl";
import { getPolygonLabel } from "./GlobleFunctions"
import * as d3 from "d3"
import {FlightGlobe} from "./FlightGlobe"

interface props {
    vaccineEnabled : boolean
    countries : any
    dateData : any
    activeCountries: Array<string>
    setActiveCountries: (countries: Array<string>) => void
    layerOne: string
    layerTwo: string
    regions: Array<string>
    language: string
}

/**
 * 
 * TODO: fix vaccine data
 */

export const GlobeFactory : React.FC<props> = ({vaccineEnabled, countries, dateData, 
  activeCountries, setActiveCountries, layerOne, layerTwo, regions, language}) => {
    let colorScaleBlue = d3.scaleSequentialSqrt(d3.interpolateBlues);
    let colorScale = d3.scaleSequentialSqrt(d3.interpolateReds)
    const [hoverD, setHoverD] = useState();

    // let [colorScale, setColor] = useState<d3.ScaleSequential<string, never>>();
    if (layerOne == "Deaths") {
      colorScale = d3.scaleSequentialSqrt(d3.interpolateBlues)
    } else if (layerOne == "COVID-19 Cases") {
      colorScale = d3.scaleSequentialSqrt(d3.interpolateReds)
    } else if (layerOne == "Vaccination Rates") {
      colorScale = d3.scaleSequentialSqrt(d3.interpolateGreens)
    } else if (layerOne == "Stringency Index") {
      colorScale = d3.scaleSequentialSqrt(d3.interpolateOranges)
    } else if (layerOne == "GDP Growth Rate") {
      colorScale = d3.scaleSequentialSqrt(d3.interpolatePurples)
    } else if (layerOne == "Unemployment Rate") {
      colorScale = d3.scaleSequentialSqrt(d3.interpolateGreys)
    }

    if (layerTwo == "Deaths") {
      colorScaleBlue = d3.scaleSequentialSqrt(d3.interpolateBlues)
    } else if (layerTwo == "COVID-19 Cases") {
      colorScaleBlue = d3.scaleSequentialSqrt(d3.interpolateReds)
    } else if (layerTwo == "Vaccination Rates") {
      colorScaleBlue = d3.scaleSequentialSqrt(d3.interpolateGreens)
    } else if (layerTwo == "Stringency Index") {
      colorScaleBlue = d3.scaleSequentialSqrt(d3.interpolateOranges)
    } else if (layerTwo == "GDP Growth Rate") {
      colorScale = d3.scaleSequentialSqrt(d3.interpolatePurples)
    } else if (layerTwo == "Unemployment Rate") {
      colorScale = d3.scaleSequentialSqrt(d3.interpolateGreys)
    }


    const setLayers = (layer : any, country : any) => {

      if (country){
        switch (layer) {
          case "None":
            return 0
          case "COVID-19 Cases": 
            return country.properties.total_cases / Math.max(1, country.properties.population)
          case "Vaccination Rates":
            return country.properties.people_fully_vaccinated / Math.max(1, country.properties.population)
          case "Stringency Index":
            return country.properties.stringency_index * 100000
          case "Deaths":
            const population = Math.max(1, country.properties.population)
            const scaled = population / 100
            return country.properties.total_deaths / scaled
          case "GDP Growth Rate":
            let n = country.properties.gdp_growth_rate
            if (n <= -20.0)
              return n * 800000 * -1
            else if ( n <= -10.0)
              return n * 400000 * -1
            else if ( n <= 0)
              return n * 200000 * -1
            else if ( n <= 5.0)
              return n * 25000
            else if ( n <= 10.0)
              return n * 12500
            else if ( n <= 15.0)
              return n * 6750
            return n * 3500
          case "Unemployment Rate":
            let t = country.properties.unemployment_rate
            if (t <= 2.0)
              return t * 500
            else if ( t <= 5.0)
              return t * 1000
            else if ( t <= 7.0)
              return t * 200000 
            else if ( t <= 10.0)
              return t * 400000
            return t * 800000
          default: 
            return 0
        }
      }
      return 0
    }

    const elevate = (feat : any, base: boolean) => {
      // console.log(feat.properties) 
      const name = feat.properties.ADM0_A3
      const region = feat.properties.CONTINENT
      if (activeCountries.includes(name)){
        return base ? 0.6 : 0.64
      } else if (regions.includes(region)) {
        // let d = activeCountries
        // d.push(name)
        // setR([...d])
        return base ? 0.6 : 0.64
      }
      return base ? 0.1 : 0.14
    }

    const setBase = (d : any) => {
      let iso_code = d.properties.ISO_A3
      let country = dateData.country_stats.find((c : any) => c.iso_code === iso_code);
      return setLayers(layerOne, country)
    }

    const setTopLayer = (d : any) => {
      let iso_code = d.properties.ISO_A3
      let country = dateData.country_stats.find((c : any) => c.iso_code === iso_code);
      return setLayers(layerTwo, country)
    }

    const maxVal = useMemo(
      () => Math.max(...countries.features.map(setBase)),
      [countries, layerOne, layerTwo]
    );

    const elevateCountries = (polygon : any ) => {
      const country = polygon.properties.ADM0_A3
      if (!country){
        return
      }
      if (activeCountries.includes(country)) {
        const newActiveCountries = activeCountries.filter((x) => {
          return x != country
        });
        setActiveCountries([...newActiveCountries])
      } else {
        let newActiveCountries = activeCountries
        newActiveCountries.push(country)
        setActiveCountries([...newActiveCountries])
      }
    }
    if (maxVal > 0) {
        colorScale.domain([0, maxVal]);
    }

    
    if (activeCountries.length > 0 || regions.length > 0) {
      if (layerTwo != "None") {
        return (
        <ReactGlobe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            // lineHoverPrecision={0}
  
            hexPolygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
            hexPolygonResolution={3}
            hexPolygonMargin={0.5}
            hexPolygonAltitude={(feat : any) => elevate(feat, false)}            
            hexPolygonColor={d => d === hoverD ? 'steelblue' : colorScaleBlue(setTopLayer(d))}
            
            polygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
            polygonAltitude={(feat : any) => elevate(feat, true)}            
            polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(setBase(d))}
            polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
            polygonStrokeColor={() => '#111'}
            polygonLabel={({ properties: d } : any) => getPolygonLabel(d, dateData, language, layerOne)}
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
              polygonAltitude={(feat : any) => elevate(feat, true)}
              polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(setBase(d))}
              polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
              polygonStrokeColor={() => '#111'}
              polygonLabel={({ properties: d } : any) => getPolygonLabel(d, dateData,language, layerOne)}
              polygonsTransitionDuration={300}
              onPolygonRightClick={(polygon: any, _event: MouseEvent) => {elevateCountries(polygon)}}
            />
        )
      }
    }
    else if (layerTwo != "None") {
        return (
        <ReactGlobe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            // lineHoverPrecision={0}
  
            hexPolygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
            hexPolygonResolution={3}
            hexPolygonMargin={0.5}
            hexPolygonAltitude={0.14}
            hexPolygonColor={d => d === hoverD ? 'steelblue' : colorScaleBlue(setTopLayer(d))}
            
            polygonsData={countries.features.filter((d : any) => d.properties.ISO_A2 !== 'AQ')}
            polygonAltitude={0.1}
            polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(setBase(d))}
            polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
            polygonStrokeColor={() => '#111'}
            polygonLabel={({ properties: d } : any) => getPolygonLabel(d, dateData, language, layerOne)}
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
                polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(setBase(d))}
                polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
                polygonStrokeColor={() => '#111'}
                polygonLabel={({ properties: d } : any) => getPolygonLabel(d, dateData, language, layerOne)}    
                polygonsTransitionDuration={300}
                onPolygonRightClick={(polygon: object, _event: MouseEvent) => {elevateCountries(polygon)}}
            />
        )
    }
}
