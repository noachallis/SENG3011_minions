import * as d3 from "d3"
import { getWord } from "../../toggles/languages/translator"

export const getPolygonLabel = (d : any, dateData : any, language : string, baseLayer : string) => {
    function get_colour_from_layer(layerName:string) {
        switch(layerName){
            case 'COVID-19 Cases':
                return "rgba(190,11,19,0.5)"
            case 'Vaccination Rates':
                return "rgba(3,100,41,0.5)"
            case 'Unemployment Rate':
                return "rgba(30,30,30,0.5)"
            case 'Deaths':
                return "rgba(10,70,144,0.5)"
            case 'GDP Growth Rate':
                return "rgba(80,31,144,0.5)"
            case 'Stringency Index':
                return "rgba(159,51,3,0.5)"
        }
        return "rgba(0,0,0,0.5)"
    }
    const baseColour = get_colour_from_layer(baseLayer)
    
    let iso_code = d.ISO_A3
    let country = dateData.country_stats.find((c : any) => c.iso_code === iso_code);
    if (country){
        return (`
        <div class=toolTip style=background:${baseColour}> 
            <b>${d.ADMIN} (${d.ISO_A3}):</b> <br />
            ${getWord('total_cases', language)}: <i>${country.properties.total_cases.toLocaleString()}</i><br/>
            ${getWord('gdp_growth_rate', language)}: <i>${country.properties.gdp_growth_rate || "Not Available"}%</i><br/>
            ${getWord('stringency_index', language)}: <i>${country.properties.stringency_index || "Not Available"}</i><br/>
            ${getWord('total_deaths', language)}: <i>${country.properties.total_deaths.toLocaleString()|| "Not Available"}</i><br/>
            ${getWord('unemployment_rate', language)}: <i>${country.properties.unemployment_rate || "Not Available"}%</i><br/>
            ${getWord('total_vacced', language)}: <i>${(country.properties.people_fully_vaccinated/country.properties.population * 100).toFixed(0)}%</i>
        </div>
        `)
    } else {
        return (`
        <b>${d.ADMIN} (${d.ISO_A3}):</b> <br />
        ${getWord('total_cases', language)}: <i>0</i><br/>
        ${getWord('total_vacced', language)}: <i>0%</i>
        `)
    }
}

// Get Vac Rates
export const getValVacs = (d : any, dateData : any) => {
    let iso_code = d.properties.ISO_A3
    let country = dateData.country_stats.find((c : any) => c.iso_code === iso_code);
    if (country){
        return country.properties.people_fully_vaccinated / Math.max(1, country.properties.population);
    } else {
        return 0
    }
}