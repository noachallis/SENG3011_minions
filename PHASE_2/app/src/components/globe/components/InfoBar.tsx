import React, { useState, useMemo, useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import { DarkMode } from "./graphs/chart"
import { AllData } from "../data"
import Grid from '@mui/material/Grid';

interface props {
    countries : Array<string>
}

export const InfoBar : React.FC<props> = ({countries}) => {

    if (countries.length > 0 ){
        return (
            <div>
                <Box className="infoBarRight" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <DarkMode countries={countries} rahul={"covid"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DarkMode countries={countries} rahul={"vaccine"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DarkMode countries={countries} rahul={"gdp"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DarkMode countries={countries} rahul={"unemployment"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DarkMode countries={countries} rahul={"deaths"}/>
                        </Grid>
                    </Grid>
                    {/* <DarkMode countries={countries}/> */}
                </Box>

                <Box className="infoBarLeft" sx={{ flexGrow: 1 }}>
                    {/* <Grid container spacing={2}>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                            <DarkMode countries={countries} rahul={"covid"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DarkMode countries={countries} rahul={"unemployment"}/>
                        </Grid>
                    </Grid> */}
                    {/* <DarkMode countries={countries}/> */}
                </Box>
            </div>
        )
    }
    return (<></>)
}