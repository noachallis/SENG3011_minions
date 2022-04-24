import React, { useState } from "react";
import Box from '@mui/material/Box';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

interface props {
    setLanguage :  (language : string) => void
    language : string
}

export const LanguageToggle : React.FC<props> = ({setLanguage, language}) => {

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setLanguage(newValue)
  };

  const useStyles = makeStyles({
    text: {
      color : "white"
    },
    customOutline: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "& .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiInputLabel-root": {
        color: "white"
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "white"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "& .MuiSelect-icon": {
        fill: "white"
      }
    },
  });

  const classes = useStyles();

    return (
        <Box className="languageControl">
        <FormControl fullWidth 
          variant="outlined"
          classes={{ root: classes.customOutline }}
        >
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          color="primary"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Language"
          onChange={handleChange}
          data-cy="language-selection"
        >
          <MenuItem value={"en"}>English</MenuItem>
          <MenuItem value={"de"}>Deutsch</MenuItem>
          <MenuItem value={"es"}>español</MenuItem>
          <MenuItem value={"fr"}>français</MenuItem>
          <MenuItem value={"cn"}>普通话</MenuItem>
          <MenuItem value={"kr"}>한국어</MenuItem>
          <MenuItem value={"jp"}>日本語</MenuItem>
          <MenuItem value={"hn"}>हिन्दी</MenuItem>
        </Select>
      </FormControl>
      </Box>
    )
}
