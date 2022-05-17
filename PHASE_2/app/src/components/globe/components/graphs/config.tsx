import { Yard } from "@mui/icons-material";
import React, { useState } from "react";
import { AllData } from "../../data"

//

const options = {
  elementType: ["line", "area", "bar"],
  primaryAxisType: ["linear", "time", "log", "band"],
  secondaryAxisType: ["linear", "time", "log", "band"],
  primaryAxisPosition: ["top", "left", "right", "bottom"],
  secondaryAxisPosition: ["top", "left", "right", "bottom"],
  secondaryAxisStack: [true, false],
  primaryAxisShow: [true, false],
  secondaryAxisShow: [true, false],
  interactionMode: ["primary", "closest"],
  tooltipGroupingMode: ["single", "primary", "secondary", "series"],
  tooltipAnchor: [
    "closest",
    "top",
    "bottom",
    "left",
    "right",
    "center",
    "gridTop",
    "gridBottom",
    "gridLeft",
    "gridRight",
    "gridCenter",
    "pointer",
  ],
  tooltipAlign: [
    "auto",
    "top",
    "bottom",
    "left",
    "right",
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
    "center",
  ],
  snapCursor: [true, false],
} as const;

type DataType = "time" | "ordinal" | "linear";
type ElementType = typeof options["elementType"][number];
type PrimaryAxisType = typeof options["primaryAxisType"][number];
type SecondaryAxisType = typeof options["secondaryAxisType"][number];
type PrimaryAxisPosition = typeof options["primaryAxisPosition"][number];
type SecondaryAxisPosition = typeof options["secondaryAxisPosition"][number];
type TooltipAnchor = typeof options["tooltipAnchor"][number];
type TooltipAlign = typeof options["tooltipAlign"][number];
type InteractionMode = typeof options["interactionMode"][number];
type TooltipGroupingMode = typeof options["tooltipGroupingMode"][number];

const optionKeys = Object.keys(options) as (keyof typeof options)[];

type god = Array<{
  label: string,
  data: Array<{
      primary: Date,
      secondary: number | null,
      radius: undefined,
  }>
}>

type jesus = Array<{
    primary: Date,
    secondary: number | null,
    radius: undefined,
}>

interface props {
  series: number
  datums?: number
  useR?: boolean
  show?: (keyof typeof options)[]
  count?: number
  resizable?: boolean
  canRandomize?: boolean
  dataType?: DataType
  elementType?: ElementType
  primaryAxisType?: PrimaryAxisType
  secondaryAxisType?: SecondaryAxisType
  primaryAxisPosition?: PrimaryAxisPosition
  secondaryAxisPosition?: SecondaryAxisPosition
  primaryAxisStack?: boolean
  secondaryAxisStack?: boolean
  primaryAxisShow?: boolean
  secondaryAxisShow?: boolean
  tooltipAnchor?: TooltipAnchor
  tooltipAlign?: TooltipAlign
  interactionMode?: InteractionMode
  tooltipGroupingMode?: TooltipGroupingMode
  snapCursor?: boolean
  countries : Array<string>
}

export function useChartConfig({
  series,
  datums = 10,
  useR,
  show = [],
  count = 1,
  resizable = true,
  canRandomize = true,
  dataType = "time",
  elementType = "line",
  primaryAxisType = "time",
  secondaryAxisType = "linear",
  primaryAxisPosition = "bottom",
  secondaryAxisPosition = "left",
  primaryAxisStack = false,
  secondaryAxisStack = true,
  primaryAxisShow = true,
  secondaryAxisShow = true,
  tooltipAnchor = "closest",
  tooltipAlign = "auto",
  interactionMode = "primary",
  tooltipGroupingMode = "primary",
  snapCursor = true,
  countries = [],
  rahul
  // setData,
}: {
  series: number;
  datums?: number;
  useR?: boolean;
  show?: (keyof typeof options)[];
  count?: number;
  resizable?: boolean;
  canRandomize?: boolean;
  dataType?: DataType;
  elementType?: ElementType;
  primaryAxisType?: PrimaryAxisType;
  secondaryAxisType?: SecondaryAxisType;
  primaryAxisPosition?: PrimaryAxisPosition;
  secondaryAxisPosition?: SecondaryAxisPosition;
  primaryAxisStack?: boolean;
  secondaryAxisStack?: boolean;
  primaryAxisShow?: boolean;
  secondaryAxisShow?: boolean;
  tooltipAnchor?: TooltipAnchor;
  tooltipAlign?: TooltipAlign;
  interactionMode?: InteractionMode;
  tooltipGroupingMode?: TooltipGroupingMode;
  snapCursor?: boolean;
  countries : Array<string>,
  rahul : string
}) {


  const [state, setState] = React.useState({
    count,
    resizable,
    canRandomize,
    dataType,
    elementType,
    primaryAxisType,
    secondaryAxisType,
    primaryAxisPosition,
    secondaryAxisPosition,
    primaryAxisStack,
    secondaryAxisStack,
    primaryAxisShow,
    secondaryAxisShow,
    tooltipAnchor,
    tooltipAlign,
    interactionMode,
    tooltipGroupingMode,
    snapCursor,
    datums,
    data: makeDataFrom(dataType, series, datums, countries, useR),
  });
  const [allData, setAllData] = useState<any>(AllData)
  function makeDataFrom(
    dataType: DataType,
    series: number,
    datums: number,
    countries : Array<string>,
    useR?: boolean, 
  ) {
    let pleaseWork : god = []
    for (let country of countries) {
      let test : jesus = [{primary : new Date("2019-31-12"), secondary : 0, radius : undefined}]
      let first = { label : country + " " + rahul, data : test}
      for (let date in allData) {
        let mini = { primary : new Date(date as string), secondary : 0, radius : undefined}
        if (country == "Globe") {
          if (rahul == "COVID-19 Cases") {
            mini.secondary = allData[date].total_cases
          } else if (rahul == "Fully Vaccinated Persons") {
            mini.secondary =  allData[date].people_fully_vaccinated
          } else if (rahul == "Deaths") {
            mini.secondary =  allData[date].total_deaths
          }
          test.push(mini)
          continue
        }
        // const current_date = 
        for (let y of allData[date].country_stats) {
     
          if (y.iso_code == country) {
            if (rahul == "COVID-19 Cases"){
              mini.secondary = y.properties.total_cases
            } else if (rahul == "Fully Vaccinated Persons") {
              mini.secondary = y.properties.people_fully_vaccinated
            } else if (rahul == "population") {
              mini.secondary = y.properties.population
            } else if (rahul == "Deaths") {
              mini.secondary = y.properties.total_deaths
            } else if (rahul == "Real GDP Growth Rate") {
              mini.secondary = parseInt(y.properties.gdp_growth_rate)
            } else if (rahul == "Unemployment Rate") {
              mini.secondary = y.properties.unemployment_rate
            } else if (rahul == "stringency") {
              mini.secondary = y.properties.stringency_index
            }
          }
        }
        test.push(mini)
      }
      pleaseWork.push(first)
    }
    // let rahul = { label : "Covid Australia", data : [] as any}
    // setData(pleaseWork)
    return pleaseWork
  }
  
  React.useEffect(() => {
    setState((old) => ({
      ...old,
      data: makeDataFrom(dataType, series, datums, countries, useR),
    }));
  }, [count, dataType, datums, series, countries, rahul, useR]);

  const randomizeData = () =>
    setState((old) => ({
      ...old,
      data: makeDataFrom(dataType, series, datums, countries, useR),
    }));

  const Options = optionKeys
    .filter((option) => show.indexOf(option) > -1)
    .map((option) => (
      <div key={option}>
        {option}: &nbsp;
        <select
          value={state[option] as string}
          onChange={({ target: { value } }) =>
            setState((old) => ({
              ...old,
              [option]:
                typeof options[option][0] === "boolean"
                  ? value === "true"
                  : value,
            }))
          }
        >
          {(options[option] as any).map((d: any) => (
            <option value={d as string} key={d.toString()}>
              {d.toString()}
            </option>
          ))}
        </select>
        <br />
      </div>
    ));

  return {
    ...state,
    randomizeData,
    Options,
  };
}


