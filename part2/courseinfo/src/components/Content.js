import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  // console.log(parts); // This is an array of objects
  return (
    <>
      {parts.map((part) => (
        <Part part={part} key={part.id} /> // passing an object
      ))}
    </>
  );
};

export default Content;
