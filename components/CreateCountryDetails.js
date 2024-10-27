"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCountyDetails = void 0;
const util_1 = require("../helpers/util");
const RenderCountryBorders_1 = require("./RenderCountryBorders");
const CreateCountyDetails = (countryDetails) => {
    const { name, population, region, subRegion, capital, tld, flags, currencies, languages, borders } = countryDetails;
    const { countryNativeName, countryCapital, countryTld, countryCurrency, countryLanguages } = (0, util_1.getCountryDetails)(name.nativeName, capital, tld, currencies, languages);
    const formattedPopulation = (0, util_1.formatCommaToNumber)(population);
    const mainContent = document.createElement('div');
    mainContent.classList.add('country-content-details');
    mainContent.innerHTML = `
        <button class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" viewBox="0 -960 960 960" width="24px" fill="#202C37" class="arrow-left-icon">
                <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/>
            </svg>
            <span>Back</span>
        </button>
        <div class="country-details-container">
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
                        <h4>Sub Region: <span class="details-subregion">${subRegion}</span></h4>
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
        </div>
    `;
    const borderLists = mainContent.querySelector('.country-border-lists');
    const borderNone = document.createElement('li');
    const countryBorders = (0, util_1.formatCountryCodes)(borders);
    if (borders && borderLists && countryBorders) {
        (0, RenderCountryBorders_1.RenderCountryBorders)(countryBorders, borderLists);
    }
    else {
        borderNone.textContent = 'No Borders';
        borderLists.appendChild(borderNone);
    }
    return mainContent;
};
exports.CreateCountyDetails = CreateCountyDetails;
