/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Filter from "./Filter";
import CountryDetails from "./CountryDetails";

const Countries = ({ countries, filter, handleFilterChange }) => {
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    setCountryDetails(null);
  }, [filter]);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  function showCountry(cca3) {
    const country = filteredCountries.find(country => country.cca3 === cca3);
    setCountryDetails(country);
  }

  let content;

  if (countryDetails) {
    content = <CountryDetails country={countryDetails} />;
  } else if (filteredCountries.length > 10) {
    content = <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    content = <CountryDetails country={filteredCountries[0]} />;
  } else if (filteredCountries.length > 0) {
    content = filteredCountries.map((country) => (
      <div key={country.cca3}>
        {country.name.common}{" "}
        <button onClick={() => showCountry(country.cca3)}>show</button>
      </div>
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
