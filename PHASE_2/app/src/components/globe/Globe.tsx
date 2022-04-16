import React, { useEffect, useState, useMemo, useRef } from "react";
import { LanguageToggle } from "../toggles/languages/languages";
import { getWord } from '../toggles/languages/translator';
import { dates } from '../toggles/slider/dates';
import { SliderComponent } from "../toggles/slider/slider";
import { GlobeFactory } from "./components/GlobeFactory"
import { Toggle } from "../toggles/vaccineToggle/toggle"
import {NavBar, finalState} from "../NavBar";


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

  const [currentIndex, setCurrentDate] = useState(dates.length-1);
  const [vaccineEnabled, setVaccine] = useState(true);
  const [sliderPlaying, setsliderPlaying] = useState(false);
  const intervalIdRef = useRef(0);
  const [language, setLanguage] = useState('en');


  useEffect(() => {
    // load map
    fetch('datasets/countries.geojson')
    .then(res => res.json())
    .then(setCountries)
    .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    // load data
    fetch('datasets/2022-03-01_map.json')
    .then(res => res.json())
    .then(setDateData)
    .catch((e) => console.error(e));
  }, []);
  

  const getDateData = (date : string) => {
    const path = "datasets/" + date 
    fetch(path)
    .then(res => res.json())
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
      const newDate = dates[newIndex as number];
      getDateData(newDate)
    }
  }

  const handleChangeAuto = (index: number) => {
    let newIndex = (index + 1) % dates.length
    setCurrentDate(newIndex as number);
    const newDate = dates[newIndex as number];
    getDateData(newDate)  
  }

  useEffect(() => {
    let index = currentIndex
    if (sliderPlaying) {
      intervalIdRef.current = window.setInterval(() => {
        handleChangeAuto(index);
        index = (index + 1) % dates.length
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
  const percentVaccinated = (dateData.people_fully_vaccinated / dateData.world_population * 100).toFixed(0)

  return (
    <div className="Wrapper">
      <NavBar updateGlobe={navBarLayerSelect}/>
      <div className="Globe">
        <GlobeFactory vaccineEnabled={vaccineEnabled} countries={countries} dateData={dateData}/>
      </div>
      <p className="statsOverview">{getWord('total_cases', language)}: {totalCases} &emsp;&emsp; {getWord('pop_vacced', language)}: {percentVaccinated}%</p>
      <SliderComponent currentIndex={currentIndex} dates={dates} sliderPlaying={sliderPlaying} setSlider={setsliderPlaying} length={dates.length - 1} handleChange={handleChange}/>
      <Toggle setVaccine={setVaccine} vaccineEnabled={vaccineEnabled}/>
      <LanguageToggle setLanguage={setLanguage}/>
    </div>
  
  );
}

export default Globe;

