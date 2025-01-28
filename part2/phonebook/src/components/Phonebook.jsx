/* eslint-disable react/prop-types */

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";

const Phonebook = ({
  filter,
  handleFilterChange,
  newName,
  newPhone,
  handleNameChange,
  handlePhoneChange,
  addPerson,
  persons,
  deletePerson,
}) => {
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
      <PersonList persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default Phonebook;
