import './style.css';
import { fetchAllCountries } from './api/fetchCountries';
import RenderAllCountries, { pageState } from './components/RenderAllCountries';
import { setCurrentCountries, getCurrentCountries, applySkeletonLoader } from './helpers/util';
import {
  handlePagination,
  filterCountriesByRegion,
  setupThemeSwitch,
  handleDropdownClick,
} from './components/eventHandlers';

async function initialize(): Promise<void> {
  const countries = await fetchAllCountries();

  applySkeletonLoader();

  if (countries) {
    setTimeout(() => {
      setCurrentCountries(countries);
      pageState.currentPage = 1;

      handlePagination(getCurrentCountries());
      RenderAllCountries(getCurrentCountries());

      filterCountriesByRegion();
    }, 1500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initialize();
  setupThemeSwitch();
  handleDropdownClick();
});
