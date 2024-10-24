import { CreateCountyDetails } from './CreateCountryDetails';
import { CountryDetails } from '../interface/countryInterface';

const CountryDetails = (countryDetails: CountryDetails) => {
  const countryDetailsSection = <HTMLElement>document.createElement('section');
  countryDetailsSection.classList.add('country-details');
  countryDetailsSection.innerHTML = `
    <button class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" viewBox="0 -960 960 960" width="24px" fill="#202C37" class="arrow-left-icon">
            <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/>
        </svg>
        <span>Back</span>
    </button>
  `
  countryDetailsSection.appendChild(CreateCountyDetails(countryDetails));
};

export default CountryDetails;
