import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronLeft } from '@mui/icons-material';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { getWord } from "./toggles/languages/translator"
import {LanguageToggle} from "./toggles/languages/languages"

interface props {
  updateGlobe: (finalState:finalState) => void
  setLayerOne: (layer : string) => void
  setLayerTwo: (layer : string) => void
  setActiveRegions : (regions : Array<string>) => void
  setLanguage : (language : string) => void
  language: string
}

export type finalState = {
  base: string,
  upper: string,
  region: string,
  hasError: boolean
};

const useStyles = makeStyles({
  text: {
    color : "white",
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
      color: "white",
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
  paper: {
    "& .MuiDrawer-paperAnchorLeft": {
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)'
    }
  }
});

export const NavBar: React.FC<props> = ({updateGlobe, setLayerOne, setLayerTwo, setActiveRegions, setLanguage, language}) => {

  const classes = useStyles();

  // select dropdown options / can customise or change these
  const allSelectOptions = ["None", "COVID-19 Cases", "Vaccination Rates", "Stringency Index", "Deaths", "GDP Growth Rate","Unemployment Rate"]
  const defaultBaseSelectOptions = ["COVID-19 Cases", "Vaccination Rates", "Stringency Index", "Deaths", "GDP Growth Rate","Unemployment Rate"]
  
  const whoRegionSelectOptions = ["None", "Africa (AFR)", "Americas (AMR)", "South-East Asia (SEAR)", "Europe (EUR)", "Eastern Mediterranean (EMR)", "Western Pacific (WPR)"]
  const continentSelectOptions = ["None", "North America", "South America", "Europe", "Africa", "Asia", "Oceania"]

  // nav bar outside settings
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (open: boolean) => (_event: React.MouseEvent) => {
    setOpen(open);
  };

  // every select has the value and the error
  const [baseLayerSelect, setBaseLayerSelect] = React.useState({value: "COVID-19 Cases", error: false});
  const [upperLayerSelect, setUpperLayerSelect] = React.useState({value: "None", error: false});
  // final state select is what gets passed to the updateglobe so it can update layers of globe in Globe.tsx
  // TODO: update this with default values we want e.g. COVID-19 and vaccination
  const [finalStateSelect, setFinalStateSelect] = React.useState({base: "COVID-19 Cases", upper: "", region: "", hasError:false})

  const [baseSelectOptions, setBaseSelectOptions] = React.useState(defaultBaseSelectOptions)
  const [upperSelectOptions, setUpperSelectOptions] = React.useState(remove_element_from_array("COVID-19 Cases", allSelectOptions))

  const [regionSelect, setRegionSelect] = React.useState("None")

  const handleBaseLayerChange = (event: SelectChangeEvent) => {
    // if base layer new value is same as other select value, then show error (can't select two options)
    const newValue = event.target.value;
    if (newValue == upperLayerSelect["value"]) {
      // still change the base layer select to show the change made, and update with error
      setBaseLayerSelect({value: newValue, error: true})
      // don't update finalselect values but update with error
      setFinalStateSelect({...finalStateSelect, hasError:true})
      setLayerOne(newValue)
    } else {

      // update both with new value and no error
      setBaseLayerSelect({value: newValue, error: false});
      setFinalStateSelect({base: newValue, upper: upperLayerSelect["value"], region: regionSelect, hasError: false})
      // update upper select options
      setUpperSelectOptions(remove_element_from_array(newValue, allSelectOptions))
      setLayerOne(newValue)
    }
  };

  const handleUpperLayerChange = (event : SelectChangeEvent) => {
    const newValue = event.target.value;
    // if upper layer new value is same as other select value, then show error (can't select two options)
    if (newValue == baseLayerSelect["value"]) {
      setUpperLayerSelect({value: newValue, error: true})
      setFinalStateSelect({...finalStateSelect, hasError:true})
      setLayerTwo(newValue || "None")
    } else {
      setUpperLayerSelect({value: newValue, error: false});
      setFinalStateSelect({base: baseLayerSelect["value"], upper: newValue, region: regionSelect, hasError: false})
      setBaseSelectOptions(remove_element_from_array(newValue, defaultBaseSelectOptions))
      setLayerTwo(newValue || "None")
    }
  };

  const handleRegionSelectChange = (event:SelectChangeEvent) => {
    const newValue = event.target.value;
    setRegionSelect(newValue);
    setFinalStateSelect({...finalStateSelect, region: newValue})
  }

  // handle click of save layer changes
  const handleSaveClick = () =>{
    if (finalStateSelect["hasError"]) {
    } else {
      updateGlobe(finalStateSelect)
      setLayerOne(finalStateSelect.base)
      setLayerTwo(finalStateSelect.upper || "None")
      if (finalStateSelect.region != "None") {
        setActiveRegions([finalStateSelect.region])
      } else {
        setActiveRegions([])
      }
    }
    setOpen(false)
  };
  // function to alter selection array
  function remove_element_from_array(element:string, array : Array<string>) {
    var newArray = [...array]
    array.forEach((e,index)=>{
      if(e==element) return newArray.splice(index,1);
    });
    return newArray
  }

  const createBaseLayerSelect = () => {
    return (
      <FormControl fullWidth error={baseLayerSelect["error"]} classes={{ root: classes.customOutline }}>
      <InputLabel id="BaseLayer">{getWord('base_layer', language)}</InputLabel>
      <Select
        id="BaseLayerSelect"
        value={baseLayerSelect["value"]}
        label="BaseLayer"
        onChange={handleBaseLayerChange}
        className='MuiSelect-select'
      >
        {baseSelectOptions.map((selectOption) => (
            <MenuItem value={selectOption}>
              {selectOption}
            </MenuItem>
          ))}
      </Select>
      {baseLayerSelect["error"] && <FormHelperText>Cannot have same dataset selected</FormHelperText>}
    </FormControl>
    )
  }
  const createUpperLayerSelect = () => {
    return (
      <FormControl fullWidth error={upperLayerSelect["error"]} classes={{ root: classes.customOutline }}>
      <InputLabel id="upperLayer">{getWord('upper_layer', language)}</InputLabel>
      <Select
        id="UpperLayerSelect"
        value={upperLayerSelect["value"]}
        label="UpperLayer"
        onChange={handleUpperLayerChange}
        className='MuiSelect-select'
      >
        {upperSelectOptions.map((option) => (
            <MenuItem value={option}>
              {option}
            </MenuItem>
          ))}
      </Select>
      {upperLayerSelect["error"] && <FormHelperText>Cannot have same dataset selected</FormHelperText>}
    </FormControl>
    )
  }
  const createRegionSelect = () => {
    return (
      <FormControl fullWidth classes={{ root: classes.customOutline }}>
      <InputLabel id="region">{getWord('region_select', language)}</InputLabel>
      <Select
        id="RegionSelect"
        value={regionSelect}
        label="RegionSelect"
        onChange={handleRegionSelectChange}
        className='MuiSelect-select'
      >
        {continentSelectOptions.map((optionOne) => (
            <MenuItem value={optionOne}>
              {optionOne}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
    )
  }

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      className="NavBar-Inside"
    >
      <List>
        <ListItem>
          {createBaseLayerSelect()}
        </ListItem>
        <ListItem>
          {createUpperLayerSelect()}
        </ListItem>
        {/* <ListItem>
          {createRegionSelect()}
          </ListItem>
        */}
        <ListItem>
          <LanguageToggle setLanguage={setLanguage} language={language}/>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="NavBar-Main">
      <IconButton
        color="primary"
        style={ {color: 'white'}}
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        data-cy="menu-button"
      >
        <MenuIcon 
          fontSize='large'
        />
      </IconButton>
      <Drawer
        classes={{ root: classes.paper }}
        anchor={'left'}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {/* <Box  className="test">Currently Selected: {finalStateSelect["base"]} vs {finalStateSelect["upper"]}</Box> */}
        <Box className="navBarChevron">
          <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(false)}
          data-cy="menu-close-button"
          >
            <ChevronLeft />
          </IconButton>
        </Box>
        
        {list()}
        {/* <Box className="saveButton" >
          <Button sx={{width: 200}} color="error" variant="contained" onClick={handleSaveClick}>{getWord('save_changes', language)}</Button>
        </Box> */}
      </Drawer>
    </div>
  );

}
