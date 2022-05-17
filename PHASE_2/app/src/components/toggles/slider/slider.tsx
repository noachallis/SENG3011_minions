import React, { useState } from "react";
import Box from '@mui/material/Box';
import { FaPlay, FaPause } from 'react-icons/fa';
import Slider from '@mui/material/Slider';
import { getWord } from "../../toggles/languages/translator"

interface props {
    sliderPlaying : boolean
    length: number
    handleChange: (event: Event, newIndex: number | number[]) => void
    currentIndex: number
    dates : Array<string>
    setSlider: (playing : boolean) => void
    language: string  
}


export const SliderComponent : React.FC<props> = ({sliderPlaying, setSlider, length, handleChange, currentIndex, dates, language}) => {
    const valuetext = (index: number) => {
        if (currentIndex == index) {
          return ""
        }
        return `${dates[index]}`;
    }
    const valueLabelFormat = (value: number) => {
        const dateString = dates[value].split('_')[0];
        return `${dateString}`;
    }
    
    return (
      <>
      <Box className="Slider" sx={{ width: 500 }}>
        <Box className="SliderLeft">
          <Slider
            aria-label="Time Selection Slider"
            className="Slider"
            sx = {{ color: "rgba(209, 13, 13, 0.8)"}}
            getAriaValueText={valuetext}
            defaultValue={length}
            marks
            min={0}
            max={length}
            onChange={handleChange}
            step={1}
            value={currentIndex}
            valueLabelFormat={valueLabelFormat}
            valueLabelDisplay="auto"
            data-cy="date-slider"
          />
        </Box>
        <Box className="SliderRight">
        {!sliderPlaying ?  
          <FaPlay data-cy="play-button" color="white" onClick={() => setSlider(!sliderPlaying)}> </FaPlay> :
          <FaPause data-cy="pause-button" color="white" onClick={() => setSlider(!sliderPlaying)}> </FaPause>
        }
        </Box>
      </Box>
      <p className="dateLabel" data-cy="stats-overview" >
          <span className="boldStats">
            {getWord('date', language)}
          </span>
          : {valueLabelFormat(currentIndex)}
      </p>
      </>
    )
}
