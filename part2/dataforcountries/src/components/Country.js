import React from "react";

const Country = ({ country, setFilteredCountries }) => {
  // console.log();
  console.log("Rendering Country");
  let output = "";
  const showCountryDetail = (e) => {
    console.log("Running Country detail inside Country");
    console.log(country);
    setFilteredCountries([country]);
  };
  return (
    <div>
      {country.name.common} <button onClick={showCountryDetail}>show</button>
      {output}
    </div>
  );
};

export default Country;
