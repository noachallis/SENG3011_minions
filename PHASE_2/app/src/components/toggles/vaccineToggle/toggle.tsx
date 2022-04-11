import React from "react";
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface props {
    setVaccine: (playing : boolean) => void
    vaccineEnabled : boolean
}

export const Toggle : React.FC<props> = ({setVaccine, vaccineEnabled}) => {    
    return (
        <Box className="toggle">
            <FormControlLabel
                className="toggle"
                control={<Switch sx={{ m: 1 }} defaultChecked color="error"/>}
                label=""
                onChange={() => setVaccine(!vaccineEnabled)}
            />
        </Box>
    )
}
