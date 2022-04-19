import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { ExpandMore } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles';
import {ReactComponent as Vaccination} from './legendImages/vaccinationRates.svg';
import {ReactComponent as COVIDCases} from './legendImages/covid-19.svg';
import {ReactComponent as Deaths} from './legendImages/deaths1.svg';
import {ReactComponent as Stringency} from './legendImages/stringency.svg';
import {ReactComponent as EconomicGrowth} from './legendImages/economicGrowth.svg';
import {ReactComponent as Unemployment} from './legendImages/unemployment.svg';



export const useStyles = makeStyles({
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
  paper: {
    "& .MuiDrawer-paperAnchorBottom": {
      background: 'rgba(0,0,0,0.8)',
      width: '350px',
      borderRadius: '10px',
    }
  }
});

export const Legend = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (open: boolean) => (_event: React.MouseEvent) => {
    setOpen(open);
  };
  const toggleDrawerOpen = () => {
    setOpen(true)
  }
  const toggleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className='legend'>
      <Box className="legendButton" >
        {!open && <Button sx={{width: 100}} color="error" variant="contained" onClick={toggleDrawerOpen}>Legend</Button>}
      </Box>
      <Drawer
        classes={{ root: classes.paper }}
        anchor={'bottom'}
        open={open}
        onClose={toggleDrawerClose}
        BackdropProps={{ invisible: true }}
        hideBackdrop = {false}   
        variant="persistent"
      >
        <List>
          <ListItem className='legendHeader' >
            <Button sx={{width: 100}} color="error" variant="contained" onClick={toggleDrawerClose}>Legend</Button>
            <IconButton
              color="primary"
              style={ {color: 'white'}}
              aria-label="close drawer"
              onClick={toggleDrawerClose}
              sx = {{paddingLeft: 25}}
            >
              <ExpandMore/>
            </IconButton>
          </ListItem>
          <ListItem>
            <COVIDCases className='legendItem'/>
          </ListItem>
          <ListItem>
            <Vaccination className='legendItem'/>
          </ListItem>
          <ListItem>
            <Deaths className='legendItem'/>
          </ListItem>
          <ListItem>
            <Stringency className='legendItem'/>
          </ListItem>
          <ListItem>
            <EconomicGrowth className='legendItem'/>
          </ListItem>
          <ListItem>
            <Unemployment className='legendItem'/>
          </ListItem>
        </List>
      </Drawer>
    </div>
  )

}