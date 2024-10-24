export interface NativeName {
  official: string;
  common: string;
}

export interface Currency {
  name: string;
  symbol: string;
}

interface Name {
  common: string;
  nativeName?: {
    [languageCode: string]: NativeName;
  };
}

export interface CountryDetails {
  name: Name;
  population: number;
  region: string;
  subregion: string;
  capital?: string[];
  tld: string[];
  flags: { svg: string; alt: string };
  currencies?: {
    [currencyCode: string]: Currency;
  };
  languages?: {
    [languageCode: string]: string;
  };
  borders?: string[];
}

export interface Country {
  name: { common: string };
  capital: string;
  region: string;
  population: number;
  flags: { svg: string };
}
