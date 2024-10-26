import { randomizeArray, applyDetailsPageSkeleton } from '../helpers/util';
import { Country, CountryDetails as CountryDetailsInterface } from '../interface/countryInterface';
import { DisplayNoResult } from '../components/DisplayNoResult';
import CountryDetails from '../components/CountryDetails';

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

export async function fetchCountriesDetails(
  countryCode: string,
): Promise<CountryDetailsInterface | undefined> {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.error('Failed to fetch countries', error);
  }
}

export async function searchCountryDetails() {
  const searchInput = <HTMLInputElement>document.getElementById('search-country-input');
  const searchInputValue = searchInput.value.trim();
  const home = document.querySelector('.home') as HTMLElement;
  const countryDetails = document.querySelector('.country-details') as HTMLElement;

  home.classList.add('hidden');
  countryDetails?.classList.remove('hidden');

  countryDetails.innerHTML = '';

  applyDetailsPageSkeleton();

  if (!searchInputValue) {
    DisplayNoResult();
    return;
  }

  try {
    const formattedEndpoint = searchInputValue.split(' ').join('%20');

    const response = await fetch(`https://restcountries.com/v3.1/name/${formattedEndpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();

    if (result) {
      setTimeout(() => {
        CountryDetails(result[0]);
      }, 1000);
    }

    searchInput.value = '';
  } catch (error) {
    DisplayNoResult();
    searchInput.value = '';
    console.error(error);
  }
}
