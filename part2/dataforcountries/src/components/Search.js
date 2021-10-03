import React from "react";

const Search = ({ search, setSearch, countries, setFilteredCountries }) => {
  console.log("Rendering Search");
  // console.log("Search is ", search);
  const handleSearch = async (e) => {
    setSearch(e.target.value);
    // console.log("search value is ", search);
    // console.log("In between setSearch and setFiltered Countries");
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    console.log("Finished running handleSearch function");
  };
  return (
    <div>
      find countries
      <input type="text" value={search} onChange={handleSearch} />
    </div>
  );
};

export default Search;
