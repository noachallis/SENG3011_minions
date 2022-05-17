import React  from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AllData } from "../../data"

export const  NegativeArea : React.FC = () => {
    const graph_data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            name: 'Page C',
            uv: -1000,
            pv: 9800,
            amt: 2290,
        }
    ];

    for (let date in AllData) {
        const country_data = (AllData as any)[date]
        for (let y of country_data.country_stats) {
          if (y.iso_code == "test") {
     
          }
        }
      }

    const gradientOffset = () => {
        const dataMax = Math.max(...graph_data.map((i) => i.uv));
        const dataMin = Math.min(...graph_data.map((i) => i.uv));
      
        if (dataMax <= 0) {
          return 0;
        }
        if (dataMin >= 0) {
          return 1;
        }
      
        return dataMax / (dataMax - dataMin);
    };

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
            <Tooltip />
            <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={gradientOffset()} stopColor="green" stopOpacity={0.5} />
                <stop offset={gradientOffset()} stopColor="red" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="splitColor1" x1="0" y1="0" x2="0" y2="1">
                <stop offset={gradientOffset()} stopColor="orange" stopOpacity={0.5} />
                <stop offset={gradientOffset()} stopColor="blue" stopOpacity={0.5} />
            </linearGradient>
            </defs>
            <Area type="monotone" dataKey="uv" stroke="#000" fill="url(#splitColor)" />
            <Area type="monotone" dataKey="pv" stroke="#000" fill="url(#splitColor1)" />

        </AreaChart>
        </ResponsiveContainer>
    );
}
