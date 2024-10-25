import { CountryDetails as CountryDetailsInterface } from '../interface/countryInterface';
import { formatCommaToNumber, getCountryDetails, formatCountryCodes } from '../helpers/util';
import { RenderCountryBorders } from './RenderCountryBorders';

export const CreateCountyDetails = (countryDetails: CountryDetailsInterface): HTMLDivElement => {
  const { name, population, region, subregion, capital, tld, flags, currencies, languages, borders } =
    countryDetails;
  const { countryNativeName, countryCapital, countryTld, countryCurrency, countryLanguages } =
    getCountryDetails(name.nativeName, capital, tld, currencies, languages);
  const formattedPopulation = formatCommaToNumber(population);

  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('country-details-container');
  detailsContainer.innerHTML = `
      <div class="details-left-container">
          <img src=${flags.svg} alt=${flags.alt}>
      </div>
      <div class="details-right-container">
          <h2 class="details-name">${name.common}</h2>
          <div class="more-details-container">
              <div>
                  <h4>Native Name: <span class="details-native-name">${countryNativeName}</span></h4>
                  <h4>Population: <span class="details-population">${formattedPopulation}</span></h4>
                  <h4>Region: <span class="details-region">${region}</span></h4>
                  <h4>Sub Region: <span class="details-subregion">${subregion ? subregion : 'N/A'}</span></h4>
                  <h4>Capital: <span class="details-capital">${countryCapital}</span></h4>
              </div>
              <div>
                  <h4>Top Level Domain: <span class="details-level-domain">${countryTld}</span></h4>
                  <h4>Currencies: <span class="details-currencies">${countryCurrency}</span></h4>
                  <h4>Languages <span class="details-languages">${countryLanguages}</span></h4>
              </div>
          </div>
          <div class="country-borders-wrapper">
              <span>Border Countries: </span>
              <ul class="country-border-lists">

              </ul>
          </div>
      </div>
    `;

  const borderLists = <HTMLUListElement>detailsContainer.querySelector('.country-border-lists');
  const borderNone = <HTMLLIElement>document.createElement('li');
  const countryBorders = formatCountryCodes(borders);

  if (borders && borderLists && countryBorders) {
    RenderCountryBorders(countryBorders, borderLists);
  } else {
    borderNone.textContent = 'No Borders';
    borderLists.appendChild(borderNone);
  }

  return detailsContainer;
};
