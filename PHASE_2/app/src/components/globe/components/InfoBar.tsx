import React, { useState, useMemo, useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import { Line } from "./graphs/lineGraph"
import { DarkMode } from "./graphs/DarkMode"

interface props {
    countries : Array<string>
}

export const InfoBar : React.FC<props> = ({countries}) => {

    if (countries.length > 0 ){
        return (
            <div>
                {countries.map((country) => {
                    <p>{country}</p>
                })}
                <Box className="infoBar" >
                    <DarkMode/>
                </Box>
            </div>
        )
    }
    return (<></>)
}