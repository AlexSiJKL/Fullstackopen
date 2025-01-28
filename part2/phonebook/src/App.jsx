/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import numbersService from "./services/numbers";
import Phonebook from "./components/Phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  // Fetch data from the server
  useEffect(() => {
    numbersService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
  
    const existingPerson = persons.find((person) => person.name === newName);
  
    if (existingPerson) {
      // If the person already exists, ask for confirmation to update the phone number
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
  
      if (confirmUpdate) {
        // If confirmed, update the person
        const updatedPerson = { ...existingPerson, number: newPhone };
  
        numbersService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : returnedPerson)));
            setNewName("");
            setNewPhone("");
          })
          .catch((error) => {
            console.error("Error updating person:", error);
          });
      }
    } else {
      // If the person does not exist, create a new one
      const newPerson = {
        name: newName,
        number: newPhone,
      };
  
      numbersService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewPhone("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
        });
    }
  };
  

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      numbersService
        .remove(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
        });
    }
  };

  return (
    <Phonebook
      filter={filter}
      handleFilterChange={handleFilterChange}
      newName={newName}
      newPhone={newPhone}
      handleNameChange={handleNameChange}
      handlePhoneChange={handlePhoneChange}
      addPerson={addPerson}
      persons={persons}
      deletePerson={deletePerson}
    />
  );
};

export default App;
