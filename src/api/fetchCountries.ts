import RenderAllCountries from '../components/RenderAllCountries';
import { randomizeArray } from '../helpers/util';

export async function fetchAllCountries() {
  let countries = [];

  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const result = await response.json();
    const randomizeCountries = randomizeArray(result);
    countries = randomizeCountries;
    RenderAllCountries(countries);
  } catch (error) {
    console.error('Failed to fetch countries', error);
  }
}
