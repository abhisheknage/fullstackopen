import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      console.log("starting to run App effect");
      setCountries(res.data);
      console.log("finished running effect");
    });
  }, []);
  console.log("rendering App");
  return (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        countries={countries}
        setFilteredCountries={setFilteredCountries}
      />
      <Countries
        search={search}
        countries={countries}
        filteredCountries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
      />
    </>
  );
};

export default App;
