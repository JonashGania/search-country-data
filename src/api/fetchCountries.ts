import { randomizeArray } from '../helpers/util';
import { Country, CountryDetails } from '../interface/countryInterface';

export async function fetchAllCountries(): Promise<Country[] | undefined> {
  let countries = [];

  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();
    const randomizeCountries = randomizeArray(result);
    countries = randomizeCountries;

    return countries;
  } catch (error) {
    console.error('Failed to fetch countries', error);
  }
}

export async function fetchCountriesByRegion(region: string): Promise<Country[] | undefined> {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Failed to fetch countries', error);
  }
}

export async function fetchCountriesDetails(countryName: string): Promise<CountryDetails | undefined> {
  try {
    const formattedEndpoint = countryName.split(' ').join('%20');

    const response = await fetch(`https://restcountries.com/v3.1/name/${formattedEndpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.error('Failed to fetch countries', error);
  }
}
