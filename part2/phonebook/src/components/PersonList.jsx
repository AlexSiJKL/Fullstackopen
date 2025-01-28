/* eslint-disable react/prop-types */
const PersonList = ({ persons, filter, deletePerson }) => {
  return (
    <>
      {persons
        .filter(person =>
          !filter || person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map(person => (
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        ))}
    </>
  );
};

const Person = ({ person, deletePerson }) => {
  return (
    <p>
      {person.name}: {person.number}{" "}
      <button onClick={deletePerson}>delete</button>
    </p>
  );
};

export default PersonList;
