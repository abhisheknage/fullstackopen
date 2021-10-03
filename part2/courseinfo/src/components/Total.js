import React from "react";

const Total = ({ parts }) => {
  //   const [part1, part2, part3] = parts;
  return (
    <p>
      <strong>
        total of {parts.reduce((sum, part) => (sum += part.exercises), 0)}{" "}
        exercises
      </strong>
    </p>
  );
};

export default Total;
