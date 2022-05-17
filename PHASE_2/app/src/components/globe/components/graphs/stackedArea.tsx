import React  from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {AllData} from "../../data"

interface props {
    type : 'globe-vaccine' | 'globe-death' | 'globe-cases'
}

export const StackedChart : React.FC<props> = ({type}) => {
    let graph_data = []
    for (let date in AllData) {
  
        graph_data.push({name : date, 
            cases : (AllData as any)[date].total_cases,
            vaccine: (AllData as any)[date].people_fully_vaccinated,
            deaths: (AllData as any)[date].total_deaths
        })
    }
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={graph_data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Area type="monotone" dataKey="vaccine" stackId="1" stroke="blue" fill="blue" />
          <Area type="monotone" dataKey="cases" stackId="1" stroke="green" fill="green" />

          <Area type="monotone" dataKey="deaths" stackId="1" stroke="purple" fill="purple" />

        </AreaChart>
      </ResponsiveContainer>
    )  
}
