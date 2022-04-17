import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactGlobe from "react-globe.gl";
import { getPolygonLabel } from "./GlobleFunctions"
import * as d3 from "d3"

interface props {
    vaccineEnabled : boolean
    countries : any
    dateData : any
    activeCountries: Array<string>
    setActiveCountries: (countries: Array<string>) => void
    layerOne: string
    layerTwo: string
    regions: Array<string>
}

export const GlobeFactory : React.FC<props> = ({vaccineEnabled, countries, dateData, 
  activeCountries, setActiveCountries, layerOne, layerTwo, regions}) => {
    let colorScaleBlue = d3.scaleSequentialSqrt(d3.interpolateBlues);
    let colorScale = d3.scaleSequentialSqrt(d3.interpolateReds)
    const [hoverD, setHoverD] = useState();
    // let [colorScale, setColor] = useState<d3.ScaleSequential<string, never>>();
    if (layerOne == "Deaths") {
      console.log("here")
      colorScale = d3.scaleSequentialSqrt(d3.interpolateGreens)
    }
    // useEffect(() => {
    //   if (layerOne == "Deaths") {
    //     setColor(d3.scaleSequentialSqrt(d3.interpolateGreens))
    //   }
    // }, [layerOne])
    if (layerOne == "Deaths") {
      colorScale = d3.scaleSequentialSqrt(d3.interpolateGreens)
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
          case "Hospitalisations":
            return 0
          case "Deaths":
            const population = Math.max(1, country.properties.population)
            const scaled = population / 100
            return country.properties.total_deaths / scaled
          case "gdp_growth_rate":
            return country.properties.gdp_growth_rate
          default: 
            return 0
        }
      }
      return 0
    }

    const elevate = (feat : any, base: boolean) => {
      // console.log(feat.properties) 
      const name = feat.properties.SOVEREIGNT
      const region = feat.properties.CONTINENT
      if (activeCountries.includes(name) || regions.includes(region)){
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
        let newActiveCountries = activeCountries
        newActiveCountries.push(country)
        setActiveCountries([...newActiveCountries])
      }
    }
    if (maxVal > 0) {
        colorScale.domain([0, maxVal]);
    }
    if (activeCountries.length > 0 || regions.length > 0) {
      if (layerTwo) {
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
              polygonAltitude={(feat : any) => elevate(feat, true)}
              polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(setBase(d))}
              polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
              polygonStrokeColor={() => '#111'}
              polygonLabel={({ properties: d } : any) => getPolygonLabel(d, dateData)}
              polygonsTransitionDuration={300}
              onPolygonRightClick={(polygon: any, _event: MouseEvent) => {elevateCountries(polygon)}}
            />
        )
      }
    }
    else if (layerTwo) {
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
                polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(setBase(d))}
                polygonSideColor={() => 'rgba(200, 100, 100, 0.15)'}
                polygonStrokeColor={() => '#111'}
                polygonLabel={({ properties: d } : any) => getPolygonLabel(d, dateData)}    
                polygonsTransitionDuration={300}
                onPolygonRightClick={(polygon: object, _event: MouseEvent) => {elevateCountries(polygon)}}
            />
        )
    }
}