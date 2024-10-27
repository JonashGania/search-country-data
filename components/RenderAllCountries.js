"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageState = void 0;
const CreateCountries_1 = __importDefault(require("./CreateCountries"));
const util_1 = require("../helpers/util");
exports.pageState = {
    currentPage: 1,
};
const RenderAllCountries = (countries) => {
    const countriesWrapper = document.querySelector('.home-countries-wrapper');
    const pageNumber = document.querySelector('.page-number');
    if (!countriesWrapper || !pageNumber)
        return;
    const itemsPerPage = 15;
    const startIndex = (exports.pageState.currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const countriesToShow = countries.slice(startIndex, endIndex);
    countriesWrapper.innerHTML = ' ';
    countriesToShow.forEach((country, index) => {
        const flagUrl = country.flags.svg;
        const countryName = country.name.common;
        const population = (0, util_1.formatCommaToNumber)(country.population);
        const region = country.region;
        const capital = country.capital ? country.capital : 'None';
        const countryElement = (0, CreateCountries_1.default)(flagUrl, countryName, population, region, capital, index);
        countriesWrapper.appendChild(countryElement);
    });
    pageNumber.textContent = `${exports.pageState.currentPage}`;
};
exports.default = RenderAllCountries;
