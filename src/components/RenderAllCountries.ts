import CreateCountries from './CreateCountries';
import { formatCommaToNumber } from '../helpers/util';
import { Country } from '../interface/countryInterface';

export const pageState = {
  currentPage: 1,
};

const RenderAllCountries = (countries: Country[]) => {
  const countriesWrapper = <HTMLDivElement>document.querySelector('.home-countries-wrapper');
  const pageNumber = <HTMLSpanElement>document.querySelector('.page-number');

  if (!countriesWrapper || !pageNumber) return;

  const itemsPerPage = 15;
  const startIndex = (pageState.currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const countriesToShow = countries.slice(startIndex, endIndex);

  countriesWrapper.innerHTML = ' ';

  countriesToShow.forEach((country, index) => {
    const flagUrl = country.flags.svg;
    const countryName = country.name.common;
    const population = formatCommaToNumber(country.population);
    const region = country.region;
    const capital = country.capital ? country.capital : 'None';

    const countryElement = CreateCountries(flagUrl, countryName, population, region, capital, index);
    countriesWrapper.appendChild(countryElement);
  });

  pageNumber.textContent = `${pageState.currentPage}`;
};

export default RenderAllCountries;
