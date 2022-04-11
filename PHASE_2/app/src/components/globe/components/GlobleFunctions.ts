
export const getPolygonLabel = (d : any, dateData : any) => {
    let iso_code = d.ISO_A3
    let country = dateData.country_stats.find((c : any) => c.iso_code === iso_code);
    if (country){
        return (`
        <b>${d.ADMIN} (${d.ISO_A3}):</b> <br />
        Total Cases: <i>${country.properties.total_cases}</i><br/>
        Total Vaccinated: <i>${(country.properties.people_fully_vaccinated/country.properties.population * 100).toFixed(0)}%</i>
        `)
    } else {
        return (`
        <b>${d.ADMIN} (${d.ISO_A3}):</b> <br />
        Total Cases: <i>0</i><br/>
        Total Vaccinated: <i>0%</i>
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