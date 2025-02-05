/* eslint-disable react/prop-types */
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import Notification from "./Notification";

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
  errorMessage,
  successMessage,
}) => {
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default Phonebook;
