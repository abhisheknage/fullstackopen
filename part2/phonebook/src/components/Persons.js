import React from "react";
import phonebook from "../services/phonebook";
import Person from "./Person";

const Persons = ({ persons, search, setPersons, setErrorMessage }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((person) => (
      <Person
        person={person}
        setPersons={setPersons}
        persons={persons}
        setErrorMessage={setErrorMessage}
      />
    ));
};

export default Persons;
