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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllCountries = fetchAllCountries;
exports.fetchCountriesByRegion = fetchCountriesByRegion;
exports.fetchCountriesDetails = fetchCountriesDetails;
const util_1 = require("../helpers/util");
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
function fetchCountriesDetails(countryName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const formattedEndpoint = countryName.split(" ").join("%20");
            const response = yield fetch(`https://restcountries.com/v3.1/name/${formattedEndpoint}`);
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
