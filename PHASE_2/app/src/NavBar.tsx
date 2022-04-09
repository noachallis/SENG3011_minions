import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ChevronLeft } from '@mui/icons-material';

export default function NavBar() {
  // TODO:
  //  items in drawer need to be: heading -> toggle -- done
  //  persistent drawer to close on click of chevron?? -- done -> need to fix placement of chevron
  //  icon click -- done
  //  colour customisation -- done ->need consultation with team


  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (_event: React.MouseEvent) => {
      setOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      className="NavBar-Inside"
    >
      <List>
        <ListItem>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(false)}
          >
            <ChevronLeft />
          </IconButton>
        </ListItem>
        <ListItem>
          <ListItemText id="vaccine" primary="Vaccine" />
          <FormControlLabel
            control={<Switch sx={{ m: 1 }} defaultChecked color="error"/>}
            label=""
          />
        </ListItem>
        <ListItem>
          <ListItemText id="hospitalisations" primary="hospitalisations" />
          <FormControlLabel
            control={<Switch sx={{ m: 1 }} defaultChecked color="warning"/>}
            label=""
          />
        </ListItem>
        <ListItem>
          <ListItemText id="deaths" primary="deaths" />
          <FormControlLabel
            control={<Switch sx={{ m: 1 }} defaultChecked color="primary"/>}
            label=""
          />
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
      >
        <MenuIcon 
          fontSize='large'
        />
      </IconButton>
      <Drawer
        anchor={'left'}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
  
    </div>
  );

}
