export const DisplayNoResult = () => {
  const countryDetailsSection = <HTMLElement>document.querySelector('.country-details');

  countryDetailsSection.innerHTML = `
        <div class="display-error-container">
            <p>Cannot find country data. Please check if country name is correct.</p>
            <button class="back-button">
                Go back
            </button>
        </div>
    `;

  const backButton = <HTMLButtonElement>countryDetailsSection.querySelector('.back-button');
  backButton.addEventListener('click', () => {
    const home = document.querySelector('.home');
    const countryDetails = document.querySelector('.country-details');
    home?.classList.remove('hidden');
    countryDetails?.classList.add('hidden');
  });
};
