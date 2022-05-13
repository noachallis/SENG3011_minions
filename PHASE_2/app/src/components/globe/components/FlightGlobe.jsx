import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactGlobe from "react-globe.gl";
import * as d3 from "d3"
import indexBy from 'index-array-by';

const COUNTRY = 'Australia';
    const OPACITY = 0.22;

const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment});

export const FlightGlobe = () => {
    
    const [airports, setAirports] = useState([]);
    const [routes, setRoutes] = useState([]);
    
    useEffect(() => {
        // load data
        Promise.all([
          fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(res => res.text())
            .then(d => d3.csvParseRows(d, airportParse)),
          fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat').then(res => res.text())
            .then(d => d3.csvParseRows(d, routeParse))
        ]).then(([airports, routes]) => {
  
          const byIata = indexBy(airports, 'iata', false);
  
          const filteredRoutes = routes
            .filter(d => byIata.hasOwnProperty(d.srcIata) && byIata.hasOwnProperty(d.dstIata)) // exclude unknown airports
            .filter(d => d.stops === '0') // non-stop flights only
            .map(d => Object.assign(d, {
              srcAirport: byIata[d.srcIata],
              dstAirport: byIata[d.dstIata]
            }))
            .filter(d => d.srcAirport.country === COUNTRY && d.dstAirport.country !== COUNTRY); // international routes from country
  
          setAirports(airports);
          setRoutes(filteredRoutes);
        });
      }, []);
  
    return (
        <>
            <ReactGlobe
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"

                arcsData={routes}
                arcLabel={d => `${d.airline}: ${d.srcIata} &#8594; ${d.dstIata}`}
                arcStartLat={d => +d.srcAirport.lat}
                arcStartLng={d => +d.srcAirport.lng}
                arcEndLat={d => +d.dstAirport.lat}
                arcEndLng={d => +d.dstAirport.lng}
                arcDashLength={0.25}
                arcDashGap={1}
                arcDashInitialGap={() => Math.random()}
                arcDashAnimateTime={4000}
                arcColor={d => [`rgba(0, 255, 0, ${OPACITY})`, `rgba(255, 0, 0, ${OPACITY})`]}
                arcsTransitionDuration={0}

                pointsData={airports}
                pointColor={() => 'orange'}
                pointAltitude={0}
                pointRadius={0.02}
                pointsMerge={true}
            />
        </>
    )
}