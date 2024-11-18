import { whereAlpha3 } from 'iso-3166-1';

export const formatCountryCodes = (countryCodes: string[] | undefined) => {
    if (countryCodes) {
      const officialName = countryCodes
        .map((code) => {
          const country = whereAlpha3(code);
          return country?.country || 'Unknown';
        })
        .filter((name): name is string => name !== undefined);
  
      return officialName;
    }
};
  