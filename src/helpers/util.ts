interface Country {
  name: { common: string };
  capital: string;
  region: string;
  population: number;
  flags: { svg: string };
}

let isFilteredByRegion = false;
let currentCountries: Country[] = [];

export const setIsFilteredByRegion = (value: boolean) => {
  isFilteredByRegion = value;
};

export const getIsFilteredByRegion = () => {
  return isFilteredByRegion;
};

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
