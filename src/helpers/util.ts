import { Country, Currency, NativeName } from '../interface/countryInterface';
import { whereAlpha3 } from 'iso-3166-1';

let currentCountries: Country[] = [];

export const setCurrentCountries = (countries: Country[]) => {
  currentCountries = countries;
};

export const getCurrentCountries = () => {
  return currentCountries;
};

export const randomizeArray = (arr: []) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export const formatCommaToNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const applySkeletonLoader = () => {
  const homeCountriesWrapper = <HTMLDivElement>document.querySelector('.home-countries-wrapper');
  homeCountriesWrapper.innerHTML = '';

  for (let i = 0; i < 15; i++) {
    const skeletonGrid = document.createElement('div');
    skeletonGrid.classList.add('countries-grid', 'skeleton');

    homeCountriesWrapper.appendChild(skeletonGrid);
  }
};

export const applyDetailsPageSkeleton = () => {
  const countryDetails = document.querySelector('.country-details') as HTMLElement;
  countryDetails.innerHTML = `
    <div class="button skeleton"></div>
      <div class="country-details-container">
        <div class="skeleton-container skeleton"></div>
        <div class="details-right-container">
            <div class="text-big skeleton"></div>
            <div class="more-details-container">
                <div>
                    <div class="text-small skeleton"></div>
                    <div class="text-small skeleton"></div>
                    <div class="text-small skeleton"></div>
                    <div class="text-small skeleton"></div>
                    <div class="text-small skeleton"></div>
                </div>
                <div>
                    <div class="text-small skeleton"></div>
                    <div class="text-small skeleton"></div>
                    <div class="text-small skeleton"></div>
                </div>
            </div>
            <div class="country-borders-wrapper">
                <div class="text-borders skeleton"></div>
                <div class="text-xs skeleton"></div>
                <div class="text-xs skeleton"></div>
                <div class="text-xs skeleton"></div>
                <div class="text-xs skeleton"></div>
            </div>
        </div>
    </div>
  `;
};

export const closeDropdown = () => {
  const dropdownMenu = <HTMLUListElement>document.querySelector('.dropdown-menu');
  dropdownMenu.classList.remove('open');
};

export const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
};

export const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', 'inactive');
};

export const getCountryDetails = (
  nativeName: { [languageCode: string]: NativeName } | undefined,
  capital: string[] | undefined,
  tld: string[],
  currencies: { [currencyCode: string]: Currency } | undefined,
  languages: { [languageCode: string]: string } | undefined,
) => {
  let countryNativeName = 'N/A';
  let countryCurrency = 'N/A';
  let countryCapital = 'N/A';
  let countryLanguages = 'N/A';

  const countryTld = tld.length > 1 ? tld.join(', ') : tld[0];

  if (currencies) {
    const currencyValue = Object.values(currencies);
    if (currencyValue.length > 0) {
      countryCurrency = currencyValue[0].name;
    }
  }

  if (capital) {
    countryCapital = capital.length > 1 ? capital.join(', ') : capital[0];
  }

  if (languages) {
    countryLanguages = Object.values(languages).join(', ');
  }

  if (nativeName) {
    const languageCodes = Object.keys(nativeName);
    if (languageCodes.length === 1 && languageCodes[0] === 'eng') {
      countryNativeName = nativeName['eng'].common;
    } else if (languageCodes.length > 1 && languageCodes[0] === 'eng') {
      countryNativeName = nativeName[languageCodes[1]].common;
    } else {
      countryNativeName = nativeName[languageCodes[0]].common;
    }
  }

  return { countryNativeName, countryCapital, countryTld, countryCurrency, countryLanguages };
};

export const formatCountryCodes = (countryCodes: string[] | undefined) => {
  if (countryCodes) {
    const officialName = countryCodes
      .map((code) => {
        const country = whereAlpha3(code);
        return country?.country || 'Unknown';
      })
      .filter((name): name is string => name !== undefined);

    return officialName;
  }
};
