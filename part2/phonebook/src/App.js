import axios from "axios";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebook from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const addName = async (e) => {
    e.preventDefault();
    console.log("This event is ", e);
    console.log(persons.filter((person) => person.name === newName));
    // If person is already in database
    if (persons.some((person) => person.name === newName)) {
      console.log(newName);
      const addNew = window.confirm(
        `${newName} is already added to phonebook. Do you want to update their phone number?`
      );
      if (addNew) {
        const id = persons.find((person) => person.name === newName).id;
        // console.log("id is", id);
        // Update Backend
        phonebook
          .updateContact(id, {
            name: newName,
            number: newNumber,
          })
          .then((data) => {
            // Update Frontend, if backend request was successful

            setPersons(
              persons.filter((person) => person.id !== data.id).concat(data)
            );
            setSuccessMessage(`Successfully updated ${data.name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
            // setSuccessMessage(null);
          });
      }
    }
    // if person is not already in database, add a new one
    else {
      const newContact = {
        name: newName,
        number: newNumber,
      };
      phonebook.createContact(newContact).then((data) => {
        setPersons(persons.concat(data));
        setSuccessMessage(`Successfully added ${data.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  useEffect(() => {
    phonebook.getAll().then((data) => {
      setPersons(data);
      // console.log(data);
    });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter search={search} setSearch={setSearch} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        search={search}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
