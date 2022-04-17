import React, { useEffect, useState, useMemo, useRef } from "react";
import { LanguageToggle } from "../toggles/languages/languages";
import { getWord } from '../toggles/languages/translator';
import { AllDates } from "../toggles/slider/AllDates";
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
    world_population: 0,
    country_stats: [{
      iso_code: '',
      properties: {
        total_cases: 0,
        people_fully_vaccinated: 0,
        total_vaccinations_per_hundred: 0,
        population: 0
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
  // const [dateCache, setDateCache] = useState({})

  useEffect(() => {
    // load map
    console.warn("fetching2")
    fetch('datasets/countries.geojson')
    .then(res => res.json())
    .then(setCountries)
    .catch((e) => console.error(e));
  }, []);


  useEffect(() => {
    console.warn("fetching3")

    // load data
    fetch('datasets/2022-03-01_map.json')
    .then(res => res.json())
    .then(setDateData)
    .catch((e) => console.error(e));
  }, []);
  

  const getDateData = (newDate : string) => {
    const path = "http://127.0.0.1:8000/v1/covid/date?date=" + newDate 
    fetch(path)
    .then(async (res) => await res.json())
    .then(setDateData)
    .catch((e) => console.error(e));
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
      }, 500);

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
  const percentVaccinated = (dateData.people_fully_vaccinated / dateData.world_population * 100).toFixed(0)
    return (
      (
        <>
        <NavBar updateGlobe={navBarLayerSelect}/>
        <InfoBar countries={activeCountries}/>
        <div className="Wrapper">
          <div className="Globe">
            <GlobeFactory 
              vaccineEnabled={vaccineEnabled} 
              countries={countries} 
              dateData={dateData}
              activeCountries={activeCountries}
              setActiveCountries={setActiveCountries}
            />
          </div>
          <p className="statsOverview">{getWord('total_cases', language)}: {totalCases} &emsp;&emsp; {getWord('pop_vacced', language)}: {percentVaccinated}%</p>
          <SliderComponent currentIndex={currentIndex} dates={date} sliderPlaying={sliderPlaying} setSlider={setsliderPlaying} length={date.length - 1} handleChange={handleChange}/>
          <Toggle setVaccine={setVaccine} vaccineEnabled={vaccineEnabled}/>
          <LanguageToggle setLanguage={setLanguage} language={language}/>
        </div>
        </>
      
      )
    );
}

export default Globe;

