/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import numbersService from "./services/numbers";
import Phonebook from "./components/Phonebook";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
            setSuccessMessage(`Updated ${newName}'s number to ${newPhone}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            if (error.response && error.e)
            console.error("Error updating person:", error);
            setErrorMessage("Error updating person.");
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
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
          setSuccessMessage(`Added ${newName} to phonebook.`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error adding person:", error);
          setErrorMessage("Error adding person.");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
          setSuccessMessage("Person deleted successfully."); // Set success message
          setTimeout(() => {
            setSuccessMessage(null); // Clear the message after 5 seconds
          }, 5000);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          setErrorMessage("Error deleting person.");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
      errorMessage={errorMessage}
      successMessage={successMessage}
    />
  );
};

export default App;
