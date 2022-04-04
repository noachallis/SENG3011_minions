import React, { useEffect, useState } from "react";
import ReactGlobe from "react-globe.gl";
import data from "./data/pretty.json"
function Globe() {
  const [places, setPlaces] = useState([]);
  // useEffect(() => {
  //   let test = JSON.parse(data)
  //   setPlaces(test)
  //   // setPlaces(JSON.parse(data))
  // }, []);
  useEffect(() => {
    // load data
    fetch('pretty.json').then(res => res.json())
      .then(({ features }) => setPlaces(features));
  }, []);
  return (
    <div className="Globe">
    <ReactGlobe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      labelsData={places}
      labelLat={(d : any) => d.properties.latitude}
      labelLng={(d : any) => d.properties.longitude}
      labelText={(d : any) => d.properties.name}
      labelSize={(d : any) => Math.sqrt(d.properties.pop_max) * 4e-4}
      labelDotRadius={(d : any) => Math.sqrt(d.properties.pop_max) * 4e-4}
      labelColor={() => 'rgba(255, 165, 0, 0.75)'}
      labelResolution={2}
      />
    </div>
  );
}

export default Globe;
