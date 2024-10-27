"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.setupThemeSwitch = exports.handleDropdownClick = exports.filterCountriesByRegion = exports.handlePagination = void 0;
const RenderAllCountries_1 = __importStar(require("./RenderAllCountries"));
const fetchCountries_1 = require("../api/fetchCountries");
const util_1 = require("../helpers/util");
const handlePagination = (countries) => {
    var _a, _b;
    let prevButton = document.querySelector('.previous-button');
    let nextButton = document.querySelector('.next-button');
    const itemsPerPage = 15;
    const totalPages = Math.ceil(countries.length / itemsPerPage);
    const prevButtonClone = prevButton.cloneNode(true);
    const nextButtonClone = nextButton.cloneNode(true);
    (_a = prevButton.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(prevButtonClone, prevButton);
    (_b = nextButton.parentNode) === null || _b === void 0 ? void 0 : _b.replaceChild(nextButtonClone, nextButton);
    prevButton = prevButtonClone;
    nextButton = nextButtonClone;
    const updatePageButtons = () => {
        prevButton.disabled = RenderAllCountries_1.pageState.currentPage === 1;
        nextButton.disabled = RenderAllCountries_1.pageState.currentPage === totalPages;
    };
    prevButton.addEventListener('click', () => {
        if (RenderAllCountries_1.pageState.currentPage > 1) {
            RenderAllCountries_1.pageState.currentPage--;
            (0, RenderAllCountries_1.default)(countries);
            updatePageButtons();
        }
    });
    nextButton.addEventListener('click', () => {
        if (RenderAllCountries_1.pageState.currentPage < totalPages) {
            RenderAllCountries_1.pageState.currentPage++;
            (0, RenderAllCountries_1.default)(countries);
            updatePageButtons();
        }
    });
    updatePageButtons();
};
exports.handlePagination = handlePagination;
const filterCountriesByRegion = () => {
    const dropdown = document.querySelector('.dropdown-select');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const selectedRegion = document.querySelector('.selected');
    dropdown.addEventListener('click', () => {
        dropdownMenu.classList.toggle('open');
    });
    dropdownMenu.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
        const target = e.target;
        if (target.tagName === 'LI') {
            const region = target.getAttribute('data-value');
            selectedRegion.textContent = target.textContent;
            if (region) {
                RenderAllCountries_1.pageState.currentPage = 1;
                const countries = yield (0, fetchCountries_1.fetchCountriesByRegion)(region);
                if (countries) {
                    (0, util_1.setCurrentCountries)(countries);
                    (0, RenderAllCountries_1.default)((0, util_1.getCurrentCountries)());
                    (0, exports.handlePagination)((0, util_1.getCurrentCountries)());
                }
            }
            (0, util_1.closeDropdown)();
        }
    }));
};
exports.filterCountriesByRegion = filterCountriesByRegion;
const handleDropdownClick = () => {
    document.addEventListener('click', (e) => {
        const target = e.target;
        const dropdown = document.querySelector('.dropdown-menu');
        const dropdownSelect = document.querySelector('.dropdown-select');
        if (dropdown && dropdownSelect && !dropdown.contains(target) && !dropdownSelect.contains(target)) {
            (0, util_1.closeDropdown)();
        }
    });
};
exports.handleDropdownClick = handleDropdownClick;
const setupThemeSwitch = () => {
    let darkmode = localStorage.getItem('darkmode');
    const switchTheme = document.querySelector('.switch-theme');
    const theme = document.querySelector('.theme');
    if (darkmode === 'active') {
        (0, util_1.enableDarkMode)();
        theme.textContent = 'DARK';
    }
    switchTheme === null || switchTheme === void 0 ? void 0 : switchTheme.addEventListener('click', () => {
        darkmode = localStorage.getItem('darkmode');
        if (darkmode !== 'active') {
            (0, util_1.enableDarkMode)();
            theme.textContent = 'DARK';
        }
        else {
            (0, util_1.disableDarkMode)();
            theme.textContent = 'LIGHT';
        }
    });
};
exports.setupThemeSwitch = setupThemeSwitch;
