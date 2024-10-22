import './style.css';
import { fetchAllCountries } from './api/fetchCountries';
import RenderAllCountries, { pageState } from './components/RenderAllCountries';
import { handlePagination, filterCountriesByRegion } from './components/eventHandlers';
import { setIsFilteredByRegion, setCurrentCountries, getCurrentCountries } from './helpers/util';

async function initialize() {
  const countries = await fetchAllCountries();

  if (countries) {
    // setIsFilteredByRegion(false);
    setCurrentCountries(countries);
    pageState.currentPage = 1;

    handlePagination(getCurrentCountries());
    RenderAllCountries(getCurrentCountries());

    filterCountriesByRegion();
  }
}

window.onload = initialize;
