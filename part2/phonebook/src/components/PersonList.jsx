/* eslint-disable react/prop-types */
const PersonList = ({ persons, filter }) => {
  return (
    <>
      {persons
        .filter(person => !filter || person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => (
          <Person key={person.id} person={person} />
        ))}
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
  
export default PersonList;
  