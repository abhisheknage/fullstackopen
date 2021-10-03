import React, { useEffect } from "react";
import Country from "./Country";
import CountryDetail from "./CountryDetail";

const Countries = ({
  filteredCountries,
  setFilteredCountries,
  search,
  countries,
}) => {
  // useEffect(() => {
  //   if (countries.length > 0) {
  //     console.log("Countries useEffect is being run");
  //     setFilteredCountries(
  //       countries.filter((country) =>
  //         country.name.common.toLowerCase().includes(search.toLowerCase())
  //       )
  //     );
  //   }
  // }, []);
  console.log(search);
  console.log("Rendering Countries");
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return filteredCountries.map((country) => {
      return (
        <>
          <Country
            country={country}
            setFilteredCountries={setFilteredCountries}
          />
        </>
      );
    });
  } else if (filteredCountries.length === 1) {
    return <CountryDetail countryDetail={filteredCountries[0]} />;

    // console.log("output is ", Promise.resolve(output));
  }
  return <p>Too many matches, specify another filter</p>;
};

export default Countries;
