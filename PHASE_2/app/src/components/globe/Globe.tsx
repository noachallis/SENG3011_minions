import React, { useEffect, useState, useMemo, useRef } from "react";
import { LanguageToggle } from "../toggles/languages/languages";
import { getWord } from '../toggles/languages/translator';
import { AllDates } from "../toggles/slider/AllDates";
import { AllData } from "./data"
import { SliderComponent } from "../toggles/slider/slider";
import { GlobeFactory } from "./components/GlobeFactory"
import { Toggle } from "../toggles/vaccineToggle/toggle"
import {NavBar, finalState} from "../NavBar";
import { InfoBar } from "./components/InfoBar"


function Globe() {
  
  const [countries, setCountries] = useState({ 
    features: []
  });
  const [dateData, setDateData] = useState({ 
    total_cases: 0,
    people_fully_vaccinated: 0,
    population: 0,
    total_deaths : 0,
    country_stats: [{
      iso_code: '',
      properties: {
        total_cases: 0,
        people_fully_vaccinated: 0,
        population: 0,
        total_deaths : 0,
        gdp_growth_rate : 0,
        unemployment_rate : 0,
        stringency_index : 0,
      }
    }]
  });
  const [date, setDates ] =  useState<Array<string>>(AllDates);
  const [currentIndex, setCurrentDate] = useState(date.length-1);
  const [vaccineEnabled, setVaccine] = useState(true);
  const [sliderPlaying, setsliderPlaying] = useState(false);
  const intervalIdRef = useRef(0);
  const [language, setLanguage] = useState('en');
  const [activeCountries, setActiveCountries] = useState<Array<string>>([]);
  const [regions, setActiveRegions] = useState<Array<string>>([]);
  const [allData, setAllData] = useState<any>(AllData)
  const [layerOne, setLayerOne] = useState<string>("COVID-19 Cases")
  const [layerTwo, setLayerTwo] = useState<string>("None")

  useEffect(() => {
    // load map
    fetch('datasets/countries.geojson')
    .then(res => res.json())
    .then(setCountries)
    .catch((e) => console.error(e));
  }, []);


  useEffect(() => {
    // load data
    const first_date = "2022-04-15"
    const data = allData[first_date]
    setDateData(data)
    // fetch('datasets/2022-03-01_map.json')
    // .then(res => res.json())
    // .then(setDateData)
    // .catch((e) => console.error(e));
  }, []);
  

  const getDateData = (newDate : string) => {
    const type = typeof allData
    console.log(type)
    // const str: keyof (typeof allData) = newDate;

    if (allData[newDate]) {
      const data = allData[newDate]
      setDateData(data)
    }
    // const path = "http://127.0.0.1:8000/v1/covid/date?date=" + newDate 
    // fetch(path)
    // .then(async (res) => res.json())
    // .then(setDateData)
    // .catch((e) => console.error(e));
  }

  const handleChange = (event: Event, newIndex: number | number[]) => {
    // check if slider is in motion
    if (sliderPlaying){
      setsliderPlaying(false)
    }
    if (newIndex != currentIndex) {
      setCurrentDate(newIndex as number);
      const newDate = date[newIndex as number];
      getDateData(newDate)
    }
  }

  const handleChangeAuto = (index: number) => {
    let newIndex = (index + 1) % date.length
    setCurrentDate(newIndex as number);
    const newDate = date[newIndex as number];
    getDateData(newDate)  
  }

  useEffect(() => {
    let index = currentIndex
    if (sliderPlaying) {
      intervalIdRef.current = window.setInterval(() => {
        handleChangeAuto(index);
        index = (index + 1) % date.length
      }, 250);
    }
    return () => clearInterval(intervalIdRef.current);
  }, [sliderPlaying]);

  const navBarLayerSelect = (finalState : finalState) => {
    console.log(finalState)
    if (finalState["upper"] == "Vaccination Rates") {
      setVaccine(true)
    } else {
      setVaccine(false)
    }
  }

  const totalCases = dateData.total_cases
  const percentVaccinated = (dateData.people_fully_vaccinated / dateData.population * 100).toFixed(0)
    return (
      (
        <>

        <div className="Wrapper">
        <NavBar 
          updateGlobe={navBarLayerSelect} 
          setLayerOne={setLayerOne}
          setLayerTwo={setLayerTwo}
          setActiveRegions={setActiveRegions}
        />
        <InfoBar countries={activeCountries}/>
          <div className="Globe">
            <GlobeFactory 
              vaccineEnabled={vaccineEnabled} 
              countries={countries} 
              dateData={dateData}
              activeCountries={activeCountries}
              setActiveCountries={setActiveCountries}
              layerOne={layerOne} 
              layerTwo={layerTwo}
              regions={regions}
            />
          </div>
          <p className="statsOverview">{getWord('total_cases', language)}: {totalCases} &emsp;&emsp; {getWord('pop_vacced', language)}: {percentVaccinated}%</p>
          <SliderComponent currentIndex={currentIndex} dates={date} sliderPlaying={sliderPlaying} setSlider={setsliderPlaying} length={date.length - 1} handleChange={handleChange}/>
          {/* <Toggle setVaccine={setVaccine} vaccineEnabled={vaccineEnabled}/> */}
          <LanguageToggle setLanguage={setLanguage} language={language}/>
        </div>
        </>
      
      )
    );
}

export default Globe;

