import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Date 1',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Date 2',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Date 3',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Date 4',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Date 5',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Date 6',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Date 7',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class BarChartGlobe extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          <Bar dataKey="amt" stackId="a" fill="red" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
