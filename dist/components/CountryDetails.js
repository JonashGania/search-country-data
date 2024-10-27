"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateCountryDetails_1 = require("./CreateCountryDetails");
const CountryDetails = (countryDetails) => {
    const countryDetailsSections = document.querySelector('.country-details');
    countryDetailsSections.appendChild((0, CreateCountryDetails_1.CreateCountyDetails)(countryDetails));
};
exports.default = CountryDetails;
