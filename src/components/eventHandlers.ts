import RenderAllCountries, { pageState } from './RenderAllCountries';
import CountryDetails from './CountryDetails';
import { fetchCountriesByRegion, fetchCountriesDetails, searchCountryDetails } from '../api/fetchCountries';
import { Country } from '../interface/countryInterface';
import {
  setCurrentCountries,
  getCurrentCountries,
  closeDropdown,
  enableDarkMode,
  disableDarkMode,
  applyDetailsPageSkeleton,
} from '../helpers/util';

export const handlePagination = (countries: Country[]) => {
  let prevButton = <HTMLButtonElement>document.querySelector('.previous-button');
  let nextButton = <HTMLButtonElement>document.querySelector('.next-button');
  const itemsPerPage = 15;
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const prevButtonClone = prevButton.cloneNode(true) as HTMLButtonElement;
  const nextButtonClone = nextButton.cloneNode(true) as HTMLButtonElement;

  prevButton.parentNode?.replaceChild(prevButtonClone, prevButton);
  nextButton.parentNode?.replaceChild(nextButtonClone, nextButton);

  prevButton = prevButtonClone;
  nextButton = nextButtonClone;

  const updatePageButtons = () => {
    prevButton.disabled = pageState.currentPage === 1;
    nextButton.disabled = pageState.currentPage === totalPages;
  };

  prevButton.addEventListener('click', () => {
    if (pageState.currentPage > 1) {
      pageState.currentPage--;
      RenderAllCountries(countries);
      updatePageButtons();
    }
  });

  nextButton.addEventListener('click', () => {
    if (pageState.currentPage < totalPages) {
      pageState.currentPage++;
      RenderAllCountries(countries);
      updatePageButtons();
    }
  });

  updatePageButtons();
};

export const filterCountriesByRegion = () => {
  const dropdown = <HTMLButtonElement>document.querySelector('.dropdown-select');
  const dropdownMenu = <HTMLUListElement>document.querySelector('.dropdown-menu');
  const selectedRegion = <HTMLSpanElement>document.querySelector('.selected');

  selectedRegion.textContent = 'Filter by Region';

  dropdown.addEventListener('click', () => {
    dropdownMenu.classList.toggle('open');
    console.log('clicked');
  });

  dropdownMenu.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;

    if (target.tagName === 'LI') {
      const region = target.getAttribute('data-value');

      selectedRegion.textContent = target.textContent;

      if (region) {
        pageState.currentPage = 1;

        const countries = await fetchCountriesByRegion(region);

        if (countries) {
          setCurrentCountries(countries);
          RenderAllCountries(getCurrentCountries());
          handlePagination(getCurrentCountries());
        }
      }

      closeDropdown();
    }
  });
};

export const handleSearchCountries = () => {
  const searchInput = <HTMLInputElement>document.querySelector('.search-country-input');
  const searchButton = <HTMLButtonElement>document.querySelector('.search-button');

  searchButton.addEventListener('click', searchCountryDetails);
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchCountryDetails();
    }
  });
};

export const handleDropdownClick = () => {
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const dropdown = document.querySelector('.dropdown-menu');
    const dropdownSelect = document.querySelector('.dropdown-select');
    if (dropdown && dropdownSelect && !dropdown.contains(target) && !dropdownSelect.contains(target)) {
      closeDropdown();
    }
  });
};

export const setupThemeSwitch = () => {
  let darkmode = localStorage.getItem('darkmode');
  const switchTheme = document.querySelector('.switch-theme');
  const theme = <HTMLSpanElement>document.querySelector('.theme');

  if (darkmode === 'active') {
    enableDarkMode();
    theme.textContent = 'DARK';
  }

  switchTheme?.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    if (darkmode !== 'active') {
      enableDarkMode();
      theme.textContent = 'DARK';
    } else {
      disableDarkMode();
      theme.textContent = 'LIGHT';
    }
  });
};

export async function navigateToCountryDetails(countryCode: string) {
  const home = document.querySelector('.home') as HTMLElement;
  const countryDetails = document.querySelector('.country-details') as HTMLElement;
  home.classList.add('hidden');
  countryDetails?.classList.remove('hidden');

  countryDetails.innerHTML = '';

  applyDetailsPageSkeleton();

  const response = await fetchCountriesDetails(countryCode);

  if (response) {
    setTimeout(() => {
      CountryDetails(response);
    }, 1000);
  }
}

export const handleNavigateHome = (initialize: () => Promise<void>) => {
  const logo = document.querySelector('.logo');

  if (logo) {
    logo.addEventListener('click', initialize);
  }
};
