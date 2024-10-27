"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCountryCodes = exports.getCountryDetails = exports.disableDarkMode = exports.enableDarkMode = exports.closeDropdown = exports.applyDetailsPageSkeleton = exports.applySkeletonLoader = exports.formatCommaToNumber = exports.randomizeArray = exports.getCurrentCountries = exports.setCurrentCountries = void 0;
const iso_3166_1_1 = require("iso-3166-1");
let currentCountries = [];
const setCurrentCountries = (countries) => {
    currentCountries = countries;
};
exports.setCurrentCountries = setCurrentCountries;
const getCurrentCountries = () => {
    return currentCountries;
};
exports.getCurrentCountries = getCurrentCountries;
const randomizeArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};
exports.randomizeArray = randomizeArray;
const formatCommaToNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
exports.formatCommaToNumber = formatCommaToNumber;
const applySkeletonLoader = () => {
    const homeCountriesWrapper = document.querySelector('.home-countries-wrapper');
    homeCountriesWrapper.innerHTML = '';
    for (let i = 0; i < 15; i++) {
        const skeletonGrid = document.createElement('div');
        skeletonGrid.classList.add('countries-grid', 'skeleton');
        homeCountriesWrapper.appendChild(skeletonGrid);
    }
};
exports.applySkeletonLoader = applySkeletonLoader;
const applyDetailsPageSkeleton = () => {
    const countryDetails = document.querySelector('.country-details');
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
exports.applyDetailsPageSkeleton = applyDetailsPageSkeleton;
const closeDropdown = () => {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('open');
};
exports.closeDropdown = closeDropdown;
const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};
exports.enableDarkMode = enableDarkMode;
const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'inactive');
};
exports.disableDarkMode = disableDarkMode;
const getCountryDetails = (nativeName, capital, tld, currencies, languages) => {
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
        }
        else if (languageCodes.length > 1 && languageCodes[0] === 'eng') {
            countryNativeName = nativeName[languageCodes[1]].common;
        }
        else {
            countryNativeName = nativeName[languageCodes[0]].common;
        }
    }
    return { countryNativeName, countryCapital, countryTld, countryCurrency, countryLanguages };
};
exports.getCountryDetails = getCountryDetails;
const formatCountryCodes = (countryCodes) => {
    if (countryCodes) {
        const officialName = countryCodes
            .map((code) => {
            const country = (0, iso_3166_1_1.whereAlpha3)(code);
            return (country === null || country === void 0 ? void 0 : country.country) || 'Unknown';
        })
            .filter((name) => name !== undefined);
        return officialName;
    }
};
exports.formatCountryCodes = formatCountryCodes;
