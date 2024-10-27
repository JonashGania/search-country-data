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
require("./style.css");
const fetchCountries_1 = require("./api/fetchCountries");
const eventHandlers_1 = require("./components/eventHandlers");
const CountryDetails_1 = __importDefault(require("./components/CountryDetails"));
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        const countryDetails = yield (0, fetchCountries_1.fetchCountriesDetails)("Philippines");
        if (countryDetails) {
            (0, CountryDetails_1.default)(countryDetails);
        }
        // const countries = await fetchAllCountries();
        // applySkeletonLoader();
        // if (countries) {
        //   setTimeout(() => {
        //     setCurrentCountries(countries);
        //     pageState.currentPage = 1;
        //     handlePagination(getCurrentCountries());
        //     RenderAllCountries(getCurrentCountries());
        //     filterCountriesByRegion();
        //   }, 1500);
        //}
    });
}
document.addEventListener('DOMContentLoaded', () => {
    initialize();
    (0, eventHandlers_1.setupThemeSwitch)();
    (0, eventHandlers_1.handleDropdownClick)();
});
