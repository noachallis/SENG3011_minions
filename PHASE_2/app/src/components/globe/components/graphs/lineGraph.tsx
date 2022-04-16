import {ResizableBox } from "./Box";
import { useChartConfig } from "./config";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export const Line : React.FC = () => {
  const { data, randomizeData } = useChartConfig({
    series: 10,
    dataType: "time",
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
      {/* <button onClick={randomizeData}>Randomize Data</button> */}
      <br />
      <br />
      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  );
}
