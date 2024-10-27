"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllCountries = fetchAllCountries;
exports.fetchCountriesByRegion = fetchCountriesByRegion;
exports.fetchCountriesDetails = fetchCountriesDetails;
exports.searchCountryDetails = searchCountryDetails;
const util_1 = require("../helpers/util");
const DisplayNoResult_1 = require("../components/DisplayNoResult");
const CountryDetails_1 = __importDefault(require("../components/CountryDetails"));
function fetchAllCountries() {
    return __awaiter(this, void 0, void 0, function* () {
        let countries = [];
        try {
            const response = yield fetch('https://restcountries.com/v3.1/all');
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            const result = yield response.json();
            const randomizeCountries = (0, util_1.randomizeArray)(result);
            countries = randomizeCountries;
            return countries;
        }
        catch (error) {
            console.error('Failed to fetch countries', error);
        }
    });
}
function fetchCountriesByRegion(region) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://restcountries.com/v3.1/region/${region}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            const result = yield response.json();
            return result;
        }
        catch (error) {
            console.error('Failed to fetch countries', error);
        }
    });
}
function fetchCountriesDetails(countryCode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            const result = yield response.json();
            return result[0];
        }
        catch (error) {
            console.error('Failed to fetch countries', error);
        }
    });
}
function searchCountryDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const searchInput = document.getElementById('search-country-input');
        const searchInputValue = searchInput.value.trim();
        const home = document.querySelector('.home');
        const countryDetails = document.querySelector('.country-details');
        home.classList.add('hidden');
        countryDetails === null || countryDetails === void 0 ? void 0 : countryDetails.classList.remove('hidden');
        countryDetails.innerHTML = '';
        (0, util_1.applyDetailsPageSkeleton)();
        if (!searchInputValue) {
            (0, DisplayNoResult_1.DisplayNoResult)();
            return;
        }
        try {
            const formattedEndpoint = searchInputValue.split(' ').join('%20');
            const response = yield fetch(`https://restcountries.com/v3.1/name/${formattedEndpoint}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            const result = yield response.json();
            if (result) {
                setTimeout(() => {
                    (0, CountryDetails_1.default)(result[0]);
                }, 1000);
            }
            searchInput.value = '';
        }
        catch (error) {
            (0, DisplayNoResult_1.DisplayNoResult)();
            searchInput.value = '';
            console.error(error);
        }
    });
}
