import React, { useState, useMemo, useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import { DarkMode } from "./graphs/chart"
import Grid from '@mui/material/Grid';
import {PieChartGlobe} from "./graphs/pieChart"
import {StackedChart } from "./graphs/stackedArea"
import {NegativeArea} from "./graphs/NegativeArea"
import BarChartGlobe from "./graphs/BarChart"
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import PublicIcon from '@mui/icons-material/Public';

interface props {
    countries : Array<string>
    data : any
}

export const InfoBar : React.FC<props> = ({countries, data}) => {
    const [home, setHome] = useState(true)
    const [economy, setEconomy] = useState(false)
    const [regions, setRegions] = useState(false)

    if (countries.length > 0 ){
        return (
            <div>
                <Box className="infoBarRight" sx={{ flexGrow: 1, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx = {{color: "white", fontWeight: "bold", fontSize: 16, textAlign: "center", padding: 1, letterSpacing:0.5}}>
                            Country Comparison Insights
                        </Grid>
                    
                        <Grid item xs={4} sx = {{color: "white", fontWeight: "bold", fontSize: 16, textAlign: "center", padding: 1, letterSpacing:0.5}}>
                            <IconButton aria-label="fingerprint" color="info" onClick={() => { setEconomy(true); setHome(false); setRegions(false)}}>
                                <PaidIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={4} sx = {{color: "white", fontWeight: "bold", fontSize: 16, textAlign: "center", padding: 1, letterSpacing:0.5}}>
                            <IconButton aria-label="fingerprint" color="success" onClick={() => { setEconomy(false); setHome(true); setRegions(false)}}>
                                <HomeIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={4} sx = {{color: "white", fontWeight: "bold", fontSize: 16, textAlign: "center", padding: 1, letterSpacing:0.5}}>
                            <IconButton aria-label="fingerprint" color="warning" onClick={() => { setEconomy(false); setHome(false); setRegions(true)}}>
                                <PublicIcon />
                            </IconButton>
                        </Grid>

                        {
                            home ? (
                                <>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}> 
                                        <DarkMode countries={countries} rahul={"COVID-19 Cases"} title={"COVID-19 Cases vs. Time"}/>
                                    </Grid>
                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                        <PieChartGlobe data={data} type={"cases"} countries={countries}  title={"COVID-19 Country Case Comparison"} size={[25,45]}/>
                                    </Grid>
                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                        <PieChartGlobe data={data} type={"death"} countries={countries}  title={"COVID-19 Country Number of Deaths Comparison"} size={[25,45]} />
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}>
                                        <DarkMode countries={countries} rahul={"Deaths"} title={"Deaths vs. Time"}/>
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center", margin: [10, 0, 0, 0]}}>
                                        <DarkMode countries={countries} rahul={"Fully Vaccinated Persons"} title={"Fully Vaccinated Persons vs. Time"}/>
                                    </Grid>
                                </>
                            ) : <></>
                        }

                        {
                            economy ? 
                            (
                                <>
                                   <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}>
                                        <DarkMode countries={countries} rahul={"Real GDP Growth Rate"} title={"Real GDP Growth Rate vs. Time"}/>
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}>
                                        <DarkMode countries={countries} rahul={"Unemployment Rate"} title={"Unemployment Rate vs. Time"}/>
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}>
                                        <DarkMode countries={countries} rahul={"stringency"} title={"Stringency Index vs. Time"}/>
                                    </Grid>
                                </>
                            )
                            : <></>
                        }

                        {
                            regions ? 
                            (
                                <>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}> 
                                        <DarkMode countries={[...countries, "Globe", "OWID_AFR", "OWID_ASI", "OWID_NAM", "OWID_SAM", "OWID_OCE", "OWID_EUR"]} rahul={"COVID-19 Cases"} title={"Global Cases vs. Time"}/>
                                    </Grid>
                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                        <PieChartGlobe data={data} type={"cases"} countries={[...countries, "Globe"]}  title={"COVID-19 Country Case Comparison"} size={[25,45]}/>
                                    </Grid>
                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                        <PieChartGlobe data={data} type={"death"} countries={[...countries, "Globe"]}  title={"COVID-19 Country Number of Deaths Comparison"} size={[25,45]} />
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}> 
                                        <DarkMode countries={[...countries, "Globe", "OWID_AFR", "OWID_ASI", "OWID_NAM", "OWID_SAM", "OWID_OCE", "OWID_EUR"]} rahul={"Fully Vaccinated Persons"} title={"Global Vaccination vs. Time"}/>
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}> 
                                        <DarkMode countries={[...countries, "Globe", "OWID_AFR", "OWID_ASI", "OWID_NAM", "OWID_SAM", "OWID_OCE", "OWID_EUR"]} rahul={"Deaths"} title={"Global Deaths vs. Time"}/>
                                    </Grid>
                                    <Grid item xs={12} sx = {{color: "white", fontWeight: "bold", fontSize: 16, textAlign: "center", padding: 1, letterSpacing:0.5}}>
                                        Regional Comparisons
                                    </Grid>

                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                        <PieChartGlobe data={data} type={"cases"} title={"Cases By Continents"} size={[30,50]}/>
                                    </Grid>
                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                         <PieChartGlobe data={data} type={"death"}  title={"Deaths BY Continents"} size={[30,50]}/>
                                    </Grid>
                                    //<Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}> 
                                    //    <StackedChart type={'globe-cases'}/>
                                    //</Grid> 
                                    {/* <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}> 
                                        <NegativeArea />
                                    </Grid> */}
                                    {/* <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}> 
                                        <BarChartGlobe />
                                    </Grid> */}
                                </>
                            )
                            : <></>
                        }
                    </Grid>
                </Box>
            </div>
        )
    }
    return (<></>)
}
