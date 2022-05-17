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
import { getWord } from "../../toggles/languages/translator";

interface props {
    countries : Array<string>
    data : any
    language: string  
}

export const InfoBar : React.FC<props> = ({countries, data, language}) => {
    const [home, setHome] = useState(true)
    const [economy, setEconomy] = useState(false)
    const [regions, setRegions] = useState(false)

    if (countries.length > 0 ){
        return (
            <div>
                <Box className="infoBarRight" sx={{ flexGrow: 1, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx = {{color: "white", fontWeight: "bold", fontSize: 16, textAlign: "center", padding: 1, letterSpacing:0.5}}>
                            {/* Country Comparison Insights */}
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
                                        <DarkMode countries={countries} rahul={"COVID-19 Cases"} title={getWord('covid_time', language) as string}/>
                                    </Grid>
                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                        <PieChartGlobe data={data} type={"cases"} countries={countries}  title={getWord('case_comparison', language) as string} size={[25,45]}/>
                                    </Grid>
                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                        <PieChartGlobe data={data} type={"death"} countries={countries}  title={getWord('death_comparison', language) as string} size={[25,45]} />
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}>
                                        <DarkMode countries={countries} rahul={"Deaths"} title={getWord('death_vs_time', language) as string}/>
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center", margin: [10, 0, 0, 0]}}>
                                        <DarkMode countries={countries} rahul={"Fully Vaccinated Persons"} title={getWord('vaccinated_vs_time', language) as string}/>
                                    </Grid>
                                </>
                            ) : <></>
                        }

                        {
                            economy ? 
                            (
                                <>
                                   <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}>
                                        <DarkMode countries={countries} rahul={"Real GDP Growth Rate"} title={getWord('gdp_vs_time', language) as string}/>
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}>
                                        <DarkMode countries={countries} rahul={"Unemployment Rate"} title={getWord('unemployment_vs_time', language) as string}/>
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}>
                                        <DarkMode countries={countries} rahul={"stringency"} title={getWord('stringency_time', language) as string}/>
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
                                        <DarkMode countries={[...countries, "Globe", "OWID_AFR", "OWID_ASI", "OWID_NAM", "OWID_SAM", "OWID_OCE", "OWID_EUR"]} rahul={"COVID-19 Cases"} title={getWord('global_cases_vs_time', language) as string}/>
                                    </Grid>
                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                        <PieChartGlobe data={data} type={"cases"} countries={[...countries, "Globe"]}  title={getWord('case_comparison', language) as string} size={[25,45]}/>
                                    </Grid>
                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                        <PieChartGlobe data={data} type={"death"} countries={[...countries, "Globe"]}  title={getWord('death_comparison', language) as string} size={[25,45]} />
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}> 
                                        <DarkMode countries={[...countries, "Globe", "OWID_AFR", "OWID_ASI", "OWID_NAM", "OWID_SAM", "OWID_OCE", "OWID_EUR"]} rahul={"Fully Vaccinated Persons"} title={getWord('global_vaccinated_vs_time', language) as string}/>
                                    </Grid>
                                    <Grid item xs={12} className="graphBox" sx = {{ p: 2, textAlign: "center"}}> 
                                        <DarkMode countries={[...countries, "Globe", "OWID_AFR", "OWID_ASI", "OWID_NAM", "OWID_SAM", "OWID_OCE", "OWID_EUR"]} rahul={"Deaths"} title={getWord('global_deaths_vs_time', language) as string}/>
                                    </Grid>
                                    <Grid item xs={12} sx = {{color: "white", fontWeight: "bold", fontSize: 16, textAlign: "center", padding: 1, letterSpacing:0.5}}>
                                        {getWord('regional_comparisons', language) as string}
                                    </Grid>

                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                        <PieChartGlobe data={data} type={"cases"} title={getWord('cases_continents', language) as string} size={[30,50]}/>
                                    </Grid>
                                    <Grid item xs={6} className="graphBox" sx = {{ p: 2, textAlign: "center", marginBottom: 5}}> 
                                         <PieChartGlobe data={data} type={"death"}  title={getWord('deaths_continents', language) as string} size={[30,50]}/>
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
