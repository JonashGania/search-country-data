import { randomizeArray } from '../helpers/util';

interface Countries {
  name: { common: string };
  capital: string;
  region: string;
  population: number;
  flags: { svg: string };
}

export async function fetchAllCountries(): Promise<Countries[] | undefined> {
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

export async function fetchCountriesByRegion(region: string): Promise<Countries[] | undefined> {
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
