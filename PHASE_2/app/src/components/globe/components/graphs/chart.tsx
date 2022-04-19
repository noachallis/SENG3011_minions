import {ResizableBox} from "./Box";
import { useChartConfig } from "./config";
import React, {useState, useEffect} from "react";
import { AxisOptions, Chart } from "react-charts";

interface props {
  countries : Array<string>
}


type god = Array<{
  label: string,
  data: Array<{
      primary: Date,
      secondary: number | null,
      radius: undefined,
  }>
}>


export const DarkMode : React.FC<props> = ({countries}) => {
  let val = useChartConfig({
    series: 10,
    dataType: "time",
    countries : countries,
    type : "covid"
  });
  let data = val.data

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as unknown as Date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );
 
  
  if (val.data.length > 0 ) {
    return (
      <>
        <ResizableBox
          style={{
            background: "rgba(0, 27, 45, 0.9)",
            padding: ".5rem",
            borderRadius: "5px",
          }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <Chart
              options={{
                data : data,
                primaryAxis : primaryAxis,
                secondaryAxes : secondaryAxes,
                dark: true,
              }}
            />
          </div>
        </ResizableBox>
      </>
    );
  }
  return <></>
}
