import { useCities } from '../contexts/CitiesContext';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // cities objects have same country so we need only unique value and not duplicate
  const countries = cities.reduce((arr, city) => {
    // if new arr does not already include city.country
    if (!arr.map((el) => el.country).includes(city.country))
      // add country and emoji from city
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr; // so if the country's array already includes the current country then we just return the current country's array
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.emoji} />
      ))}
    </ul>
  );
}

export default CountryList;
