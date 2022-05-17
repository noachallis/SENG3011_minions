import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { Box } from "@mui/material";


interface props {
  type: 'cases' | 'death' | 'vaccine'
  data: any
  countries? : Array<string>
  title : string
  size: [number, number]
}


export const PieChartGlobe : React.FC<props> = ({data, type, countries, title, size}) =>  {

  const colors = ["#c9901c", "#8884d8", "#82ca9d", "#ffc658"]

  const [activeIndex, setActiveIndex] = useState(0);

  const renderActiveShape = (props : any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 5;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 5} y={ey} textAnchor={textAnchor} fill="#c9901c">{`PV ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 5} y={ey} dy={18} textAnchor={textAnchor} fill="#c9901c">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  // default values for graphs
  let graph_data = [];
  let test_fill = "#c9901c"

  if (countries && countries.includes("Globe")){
    let insert = 0
    switch (type) {
      case 'cases' : {
        insert = data.total_cases
        break
      }
      case 'death' : {
        insert = data.total_deaths
        break
      }
      case 'vaccine' : {
        insert = data.people_fully_vaccinated
        break
      }  
    }
    graph_data.push({name : "Globe", value :  insert})
  }

  for (let x of data.country_stats) {
    let insert = 0
    switch (type) {
      case 'cases' : {
        insert = x["properties"].total_cases
        test_fill = "#8884d8"
        break
      }
      case 'death' : {
        insert = x["properties"].total_deaths
        test_fill = "#82ca9d"
        break
      }
      case 'vaccine' : {
        insert = x["properties"].people_fully_vaccinated
        test_fill = "#ffc658"
        break
      }  
    }
    if (!countries) {
      switch (x.iso_code) {
        case "OWID_AFR" : {
          graph_data.push({name : 'Africa', value :  insert})
          break
        } 
        case "OWID_ASI" : {
          graph_data.push({name : 'Asia', value :  insert})
          break
        }
        case "OWID_NAM" : {
          graph_data.push({name : 'North America', value :  insert})
          break
        }
        case "OWID_SAM" : {
          graph_data.push({name : 'South America', value :  insert})
          break
        }
        case "OWID_OCE" : {
          graph_data.push({name : 'Oceania', value :  insert})
          break
        }
        case "OWID_EUR" : {
          graph_data.push({name : 'Europe', value :  insert})
          break
        }
      }
    } else {
      if (countries && countries.includes(x.iso_code)){
          graph_data.push({name : x.iso_code, value :  insert})
      }
    }

  }

  const onPieEnter = (_ : any, index : any) => {
    setActiveIndex(index)
  };

    return (
      <>
        <Box sx={{color: "white", marginTop: 5}}>{title}</Box>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={graph_data}
              cx="50%"
              cy="50%"
              innerRadius={size[0]}
              outerRadius={size[1]}
              fill={test_fill}
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
            {
              countries !== undefined ? countries.map((entry, index) => <Cell fill={colors[index % colors.length]}/>) 
              : 
              [
                <Cell fill={"#006E7F"}/>,
                <Cell fill={"#F8CB2E"}/>,
                <Cell fill={"#EE5007"}/>,
                <Cell fill={"#FF851B"}/>,
                <Cell fill={"#B22727"}/>,
                <Cell fill={"#001f3f"}/>,
              ]
            }
            </Pie>
          </PieChart>
          
        </ResponsiveContainer>      
      </>

    );
}
