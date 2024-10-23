interface Country {
  name: { common: string };
  capital: string;
  region: string;
  population: number;
  flags: { svg: string };
}

let currentCountries: Country[] = [];

export const setCurrentCountries = (countries: Country[]) => {
  currentCountries = countries;
};

export const getCurrentCountries = () => {
  return currentCountries;
};

export const randomizeArray = (arr: []) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export const formatCommaToNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const applySkeletonLoader = () => {
  const homeCountriesWrapper = <HTMLDivElement>document.querySelector('.home-countries-wrapper');
  homeCountriesWrapper.innerHTML = '';

  for (let i = 0; i < 15; i++) {
    const skeletonGrid = document.createElement('div');
    skeletonGrid.classList.add('skeleton');

    homeCountriesWrapper.appendChild(skeletonGrid);
  }
};

export const closeDropdown = () => {
  const dropdownMenu = <HTMLUListElement>document.querySelector('.dropdown-menu');
  dropdownMenu.classList.remove('open');
};

export const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
};

export const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', 'inactive');
};
