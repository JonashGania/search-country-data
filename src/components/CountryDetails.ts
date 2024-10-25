import { CreateCountyDetails } from './CreateCountryDetails';
import { CountryDetails } from '../interface/countryInterface';
import L from 'leaflet';

const CountryDetails = (countryDetails: CountryDetails) => {
  const countryDetailsSection = <HTMLElement>document.querySelector('.country-details');

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

  const backButton = <HTMLButtonElement>countryDetailsSection.querySelector('.back-button');
  backButton.addEventListener('click', () => {
    const home = document.querySelector('.home');
    const countryDetails = document.querySelector('.country-details');
    home?.classList.remove('hidden');
    countryDetails?.classList.add('hidden');
  });

  const map = countryDetailsSection.querySelector('.map') as HTMLDivElement;
  initMap(countryDetails.cca3, map);

  const countryContentDetails = countryDetailsSection.querySelector('.country-content-details');
  countryContentDetails?.appendChild(CreateCountyDetails(countryDetails));
};

async function initMap (countryCode: string, mapContainer: HTMLDivElement) {
  const map = L.map(mapContainer).setView([0, 0], 13);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);

  try {
    const response = await fetch(`/geojson/${countryCode}.json`);
    if (!response.ok) throw new Error('GeoJSON file not found');

    const geoJsonData = await response.json();

    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: {
        color: '#FF0000',
        weight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      },
    }).addTo(map);

    map.fitBounds(geoJsonLayer.getBounds());
    map.invalidateSize();
  } catch (error) {
    console.error('Error loading geoJSON file', error);
  }

}

export default CountryDetails;
