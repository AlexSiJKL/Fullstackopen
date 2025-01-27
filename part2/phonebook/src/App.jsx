/* eslint-disable react/prop-types */
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', phone: '888-333-22-33'}
  ]) 
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }
  
  const addPerson = (event) => {
    event.preventDefault();
  
    // some() for check if name is already added
  if (persons.some((person) => person.name === newName)) {
    alert(`${newName} is already added to phonebook`);
    return;
  }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      phone: newPhone
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newPhone} onChange={handlePhoneChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <Person key={person.id} person={person}/>
      ))}
    </div>
  )
}

const Person = ({person}) => {
  return (
    <p>{person.name}: {person.phone}</p>
  )
}

export default App