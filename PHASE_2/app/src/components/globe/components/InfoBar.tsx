import React, { useState, useMemo, useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import { Line } from "./graphs/lineGraph"
import { DarkMode } from "./graphs/DarkMode"

interface props {

}

export const InfoBar : React.FC = () => {

    return (
        <div>
            <Box className="infoBar" >
                <DarkMode/>
            </Box>
        </div>
    )
}