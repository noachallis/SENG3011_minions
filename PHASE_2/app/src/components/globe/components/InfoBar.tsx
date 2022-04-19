import React, { useState, useMemo, useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import { DarkMode } from "./graphs/chart"
import { AllData } from "../data"

interface props {
    countries : Array<string>
}

export const InfoBar : React.FC<props> = ({countries}) => {

    if (countries.length > 0 ){
        return (
            <div>
                <Box className="infoBar" >
                    <DarkMode countries={countries}/>
                    {/* <DarkMode countries={countries}/> */}
                </Box>
            </div>
        )
    }
    return (<></>)
}