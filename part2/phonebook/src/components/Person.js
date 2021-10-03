import React from "react";
import phonebook from "../services/phonebook";

const Person = ({ person, persons, setPersons, setErrorMessage }) => {
  const deletePerson = () => {
    //   Remove from server
    const toDelete = window.confirm(
      `Are you sure you want to delete ${person.name}'s contact info?`
    );
    if (toDelete) {
      console.log(person.id);
      phonebook
        .deleteContact(person.id)
        .then((data) => {
          // delete from frontend
          console.log(data);
          setPersons(persons.filter((item) => item.id !== person.id));
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setTimeout(() => setErrorMessage(null), 5000);
        });
    }
  };
  return (
    <div>
      {person.name} {person.number}{" "}
      <button id={person.id} onClick={deletePerson}>
        delete
      </button>
    </div>
  );
};

export default Person;
