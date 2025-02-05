/* eslint-disable react/prop-types */
import Languages from "./Languages";

const CountryDetails = ({ country }) => {
    return (
      <div key={country.cca3}>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <Languages country={country} />
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    );
  };
  
  export default CountryDetails;
  