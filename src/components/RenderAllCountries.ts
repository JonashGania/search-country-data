import CreateCountries from './CreateCountries';

interface Country {
  name: { common: string };
  capital: string;
  region: string;
  population: number;
  flags: { svg: string };
}

const RenderAllCountries = (countries: Country[]) => {
  const countriesWrapper = <HTMLDivElement>document.querySelector('.home-countries-wrapper');
  if (!countriesWrapper) return;

  countriesWrapper.innerHTML = ' ';

  const countriesToShow = countries.slice(0, 15);

  countriesToShow.forEach((country, index) => {
    const flagUrl = country.flags.svg;
    const countryName = country.name.common;
    const population = country.population;
    const region = country.region;
    const capital = country.capital ? country.capital : 'None';

    const countryElement = CreateCountries(flagUrl, countryName, population, region, capital, index);
    countriesWrapper.appendChild(countryElement);
  });
};

export default RenderAllCountries;
