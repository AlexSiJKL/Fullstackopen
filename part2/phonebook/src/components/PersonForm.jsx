/* eslint-disable react/prop-types */
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
          <label htmlFor="name">name: </label><input id="name" value={newName} onChange={handleNameChange} required/>
        </div>
        <div>
          <label htmlFor="phone">phone: </label><input id="phone" type="tel" value={newPhone} onChange={handlePhoneChange} required/>
        </div>
          <button type="submit">add</button>
      </form>
    );
  };
  
  export default PersonForm;
  