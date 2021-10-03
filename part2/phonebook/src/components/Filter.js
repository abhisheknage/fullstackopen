import React from "react";

const Filter = ({ search, setSearch }) => {
  return (
    <div>
      Filter shown with{" "}
      <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
    </div>
  );
};

export default Filter;
