"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayNoResult = void 0;
const DisplayNoResult = () => {
    const countryDetailsSection = document.querySelector('.country-details');
    countryDetailsSection.innerHTML = `
        <div class="display-error-container">
            <p>Cannot find country data. Please check if country name is correct.</p>
            <button class="back-button">
                Go back
            </button>
        </div>
    `;
    const backButton = countryDetailsSection.querySelector('.back-button');
    backButton.addEventListener('click', () => {
        const home = document.querySelector('.home');
        const countryDetails = document.querySelector('.country-details');
        home === null || home === void 0 ? void 0 : home.classList.remove('hidden');
        countryDetails === null || countryDetails === void 0 ? void 0 : countryDetails.classList.add('hidden');
    });
};
exports.DisplayNoResult = DisplayNoResult;
