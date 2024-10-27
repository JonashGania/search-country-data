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
const CreateCountryDetails_1 = require("./CreateCountryDetails");
const leaflet_1 = __importDefault(require("leaflet"));
const CountryDetails = (countryDetails) => {
    const countryDetailsSection = document.querySelector('.country-details');
    countryDetailsSection.innerHTML = `
    <button class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" viewBox="0 -960 960 960" width="24px" fill="#202C37" class="arrow-left-icon">
            <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/>
        </svg>
        <span>Back</span>
    </button>
    <div class="country-content-details">
    
    </div>
    <div class="map-content">
      <div id="map" class="map"></div>
    </div>
  `;
    const backButton = countryDetailsSection.querySelector('.back-button');
    backButton.addEventListener('click', () => {
        const home = document.querySelector('.home');
        const countryDetails = document.querySelector('.country-details');
        home === null || home === void 0 ? void 0 : home.classList.remove('hidden');
        countryDetails === null || countryDetails === void 0 ? void 0 : countryDetails.classList.add('hidden');
    });
    const map = countryDetailsSection.querySelector('.map');
    initMap(countryDetails.cca3, map);
    const countryContentDetails = countryDetailsSection.querySelector('.country-content-details');
    countryContentDetails === null || countryContentDetails === void 0 ? void 0 : countryContentDetails.appendChild((0, CreateCountryDetails_1.CreateCountyDetails)(countryDetails));
};
function initMap(countryCode, mapContainer) {
    return __awaiter(this, void 0, void 0, function* () {
        const map = leaflet_1.default.map(mapContainer, { scrollWheelZoom: false }).setView([0, 0], 13);
        leaflet_1.default.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }).addTo(map);
        try {
            const response = yield fetch(`../../geojson/${countryCode}.json`);
            if (!response.ok)
                throw new Error('GeoJSON file not found');
            const geoJsonData = yield response.json();
            const geoJsonLayer = leaflet_1.default.geoJSON(geoJsonData, {
                style: {
                    color: '#FF0000',
                    weight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                },
            }).addTo(map);
            map.fitBounds(geoJsonLayer.getBounds());
            map.invalidateSize();
        }
        catch (error) {
            console.error('Error loading geoJSON file', error);
        }
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Control') {
                map.scrollWheelZoom.enable();
            }
        });
        window.addEventListener('keyup', (event) => {
            if (event.key === 'Control') {
                map.scrollWheelZoom.disable();
            }
        });
    });
}
exports.default = CountryDetails;
