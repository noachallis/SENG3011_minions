import {ResizableBox} from "./Box";
import { useChartConfig } from "./config";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export const DarkMode : React.FC = () => {
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
              data,
              primaryAxis,
              secondaryAxes,

              dark: true,
            }}
          />
        </div>
      </ResizableBox>
    </>
  );
}
