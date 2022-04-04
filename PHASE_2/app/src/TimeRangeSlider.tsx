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

  const handleChange = (event: Event, newValue: number | number[]) => {
    setArrayIndex(newValue as number);
    // use this handle change to update globe data
    const date = date_array[arrayIndex];
    console.log(date_array[arrayIndex])
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider 
        aria-label="Time-Range-Slider"
        valueLabelDisplay="off"
        value={arrayIndex}
        onChange={handleChange}
        marks
        min={0}
        max={date_array.length-1}
        step={null}
      />
    </Box>
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