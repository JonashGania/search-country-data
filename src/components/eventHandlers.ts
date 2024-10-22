import RenderAllCountries, { pageState } from './RenderAllCountries';
import { fetchCountriesByRegion } from '../api/fetchCountries';
import { setIsFilteredByRegion, setCurrentCountries, getCurrentCountries } from '../helpers/util';

interface Country {
  name: { common: string };
  capital: string;
  region: string;
  population: number;
  flags: { svg: string };
}

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

  dropdown.addEventListener('click', () => {
    dropdownMenu.classList.toggle('open');
  });

  dropdownMenu.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;

    if (target.tagName === 'LI') {
      const region = target.getAttribute('data-value');

      selectedRegion.textContent = target.textContent;

      if (region) {
        pageState.currentPage = 1;
        // setIsFilteredByRegion(true);

        const countries = await fetchCountriesByRegion(region);

        if (countries) {
          setCurrentCountries(countries);
          RenderAllCountries(getCurrentCountries());
          handlePagination(getCurrentCountries());
        }
      }

      dropdownMenu.classList.remove('open');
    }
  });
};
