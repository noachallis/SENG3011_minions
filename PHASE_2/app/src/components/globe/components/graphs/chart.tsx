import {ResizableBox} from "./Box";
import { useChartConfig } from "./config";
import React, {useState, useEffect} from "react";
import { AxisOptions, Chart } from "react-charts";

interface props {
  countries : Array<string>
  rahul: string
}


type god = Array<{
  label: string,
  data: Array<{
      primary: Date,
      secondary: number | null,
      radius: undefined,
  }>
}>


export const DarkMode : React.FC<props> = ({countries, rahul}) => {
  const {data, randomizeData} = useChartConfig({
    series: 10,
    dataType: "time",
    countries : countries,
    rahul : rahul
  });

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
 
  console.log("The length of data ", data.length)
    return (
      <>
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
      </>
    );
}
