import React, { useEffect, useState, useMemo, useRef } from "react";
import { getWord } from './toggles/languages/translator';
import {dateDataType} from "./globe/Globe";


interface props {
  currentLayerOne: string
  currentLayerTwo: string
  dateData: dateDataType
  language: string
}

export const StatsOverview: React.FC<props> = ({currentLayerOne, currentLayerTwo, dateData, language}) => {
  
  function get_data_from_layer(layerName:string) {
    switch(layerName){
      case 'COVID-19 Cases':
        const getTotalCases = dateData.total_cases
        const totalCases = getTotalCases.toLocaleString()
        return {data: totalCases, colour: "rgba(255,0,0,0.1)"}
      case 'Vaccination Rates':
        const percentVaccinated = (dateData.people_fully_vaccinated / dateData.population * 100).toFixed(0)
        return {data: percentVaccinated + "%", colour: "rgba(0,128,0,0.1)"}
      // case 'Unemployment Rate':
      //   // return {data: "0%", colour: "rgba(128,128,128,0.1)"}
      case 'Deaths':
        const getTotalDeaths = dateData.total_deaths
        const totalDeaths = getTotalDeaths.toLocaleString()
        return {data: totalDeaths, colour: "rgba(0,0,255,0.1)"}
      // case 'GDP Growth Rate':
      //   return {data: "0%", colour: "rgba(128,0,128, 0.1)"}
    }
    return {data: "", colour: "rgba(0,0,0,0.1)"}
  }
 
  const layerOneData = get_data_from_layer(currentLayerOne).data;
  const layerTwoData = get_data_from_layer(currentLayerTwo).data;
  const colour = get_data_from_layer(currentLayerOne).colour 
  
  return (
    <>
    {layerOneData != "" &&
      <p className="statsOverview" data-cy="stats-overview" >
        <>
          <span className="boldStats">
            {getWord(currentLayerOne, language)}
          </span>
          : {layerOneData}
        </>
        {layerTwoData != "" &&
          <>
            &emsp;&emsp;
            <span className="boldStats"> 
              {getWord(currentLayerTwo, language)}
            </span>
              : {layerTwoData}
          </>
        }
      </p>
    }
    </>

  );
}
