import {ResizableBox} from "./Box";
import { useChartConfig } from "./config";
import React, {useState, useEffect} from "react";
import { AxisOptions, Chart } from "react-charts";
import { Box } from "@mui/material";

interface props {
  countries : Array<string>
  rahul: string
  title: string
}




export const DarkMode : React.FC<props> = ({countries, rahul, title}) => {
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
      return (
      <>
          <Box sx={{color: "white", marginBottom: 1}}>{title}</Box>
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
