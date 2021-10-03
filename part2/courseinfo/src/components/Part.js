import React from "react";

const Part = ({ part }) => {
  const { name, exercises } = part; //destructuring the object
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Part;
