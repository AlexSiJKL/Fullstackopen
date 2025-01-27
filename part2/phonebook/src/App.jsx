/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

    // Fetch data from the server
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data); // assuming response.data contains the array of persons
      })
      .catch(error => {
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

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newPhone,
    };

    // Send a POST request to the server
    axios
      .post("http://localhost:3001/persons", newPerson)
      .then(response => {
        setPersons(persons.concat(response.data)); // Update state with the new person
        setNewName("");
        setNewPhone("");
      })
      .catch(error => {
        console.error("Error adding person:", error);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <form onChange={handleFilterChange}>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  );
};

const PersonForm = ({
  newName,
  newPhone,
  handleNameChange,
  handlePhoneChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filter }) => {
  return (
    <>
      {persons.map((person) =>
        !filter || person.name.toLowerCase().includes(filter.toLowerCase()) ? (
          <Person key={person.id} person={person} />
        ) : null
      )}
    </>
  );
};

const Person = ({ person }) => {
  return (
    <p>
      {person.name}: {person.number}
    </p>
  );
};

export default App;
