const CreateCountries = (
  flagUrl: string,
  name: string,
  population: number,
  region: string,
  capital: string,
  index: number,
): HTMLDivElement => {
  const countryElement = <HTMLDivElement>document.createElement('div');
  countryElement.classList.add('country');
  countryElement.setAttribute('data-country-index', `${index}`);

  countryElement.innerHTML = `
        <img src=${flagUrl} alt="Flag of ${name}" class="home-country-flag">
        <div class="home-country-details">
            <h3 class="home-country-name">${name}</h3>
            <h4>Population: <span class="home-country-population">${population}</span></h4>
            <h4>Region: <span class="home-country-region">${region}</span></h4>
            <h4>Capital: <span class="home-country-capital">${capital}</span></h4>
        </div>
    `;

  setTimeout(() => {
    countryElement.classList.add('fade-animation');
  }, index * 70);

  return countryElement;
};

export default CreateCountries;
