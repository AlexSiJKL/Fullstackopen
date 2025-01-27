/* eslint-disable react/prop-types */
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", phone: "040-123456" },
    { id: 2, name: "Ada Lovelace", phone: "39-44-5323523" },
    { id: 3, name: "Dan Abramov", phone: "39-44-5323523" },
    { id: 4, name: "Mary Poppendieck", phone: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

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
      phone: newPhone,
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewPhone("");
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
      {person.name}: {person.phone}
    </p>
  );
};

export default App;
