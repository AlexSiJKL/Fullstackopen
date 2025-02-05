/* eslint-disable react/prop-types */
import Languages from "./Languages";
import Filter from "./Filter";

const Countries = ({ countries, filter, handleFilterChange }) => {
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  let content;

  if (filteredCountries.length > 10) {
    content = <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    content = (
      <div key={country.cca3}>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <Languages country={country} />
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    );
  } else if (filteredCountries.length > 0) {
    content = filteredCountries.map((country) => (
      <div key={country.cca3}>{country.name.common}</div>
    ));
  } else {
    content = <p>No countries found.</p>;
  }

  return (
    <div>
      <h1>Countries</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {content}
    </div>
  );
};

export default Countries;
