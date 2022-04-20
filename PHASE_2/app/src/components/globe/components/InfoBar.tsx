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
                <Box className="infoBarRight" sx={{ flexGrow: 1, background: 'rgba(0,0,0,0.8)'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx = {{color: "white", fontSize: 14, textAlign: "center"}}>
                            Country Comparison Insights
                        </Grid>
                        <Grid item xs={12} className="graphBox">
                            <DarkMode countries={countries} rahul={"COVID-19 Cases"} title={"COVID-19 Cases vs. Time"}/>
                        </Grid>
                        <Grid item xs={12} className="graphBox">
                            <DarkMode countries={countries} rahul={"Fully Vaccinated Persons"} title={"Fully Vaccinated Persons vs. Time"}/>
                        </Grid>
                        <Grid item xs={12} className="graphBox">
                            <DarkMode countries={countries} rahul={"Real GDP Growth Rate"} title={"Real GDP Growth Rate vs. Time"}/>
                        </Grid>
                        <Grid item xs={12} className="graphBox">
                            <DarkMode countries={countries} rahul={"Unemployment Rate"} title={"Unemployment Rate vs. Time"}/>
                        </Grid>
                        <Grid item xs={12} className="graphBox">
                            <DarkMode countries={countries} rahul={"Deaths"} title={"Deaths vs. Time"}/>
                        </Grid>
                    </Grid>
                    {/* <DarkMode countries={countries}/> */}
                </Box>

                {/* <Box className="infoBarLeft" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                            <DarkMode countries={countries} rahul={"covid"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DarkMode countries={countries} rahul={"unemployment"}/>
                        </Grid>
                    </Grid>
                </Box> */}
            </div>
        )
    }
    return (<></>)
}