import React from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import * as dates from './dates.json';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';


function TimeRangeSlider() {
  const date_array = dates

  const [arrayIndex, setArrayIndex] = React.useState<number>(date_array.length - 1);

  const handleChange = (event: Event, newIndex: number | number[]) => {
    if (newIndex != arrayIndex){
      setArrayIndex(newIndex as number);
      const date = date_array[arrayIndex];
      console.log(date)
    }
    // use this handle change to update globe data
   
  };

  return (
    <div className="Time_Slider">
       <Box sx={{ width: 1000 }}>
        <Slider 
          sx={{ color: "green" }}
          aria-label="Time-Range-Slider"
          valueLabelDisplay="off"
          value={arrayIndex}
          onChange={handleChange}
          min={0}
          max={date_array.length-1}
        />
      </Box>
    </div>
  );
}
export default TimeRangeSlider

  //   <LocalizationProvider dateAdapter={AdapterDateFns}>
  //   <DatePicker
  //     label="Basic example"
  //     value={value}
  //     onChange={(newValue) => {
  //       setValue(newValue);
  //     }}
  //     renderInput={(params) => <TextField {...params} />}
  //   />
  // </LocalizationProvider>