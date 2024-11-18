import { NativeName } from "@/interface"
import { Currency } from "@/interface";

export const getFormattedCountryDetails = (
    nativeName: { [languageCode: string]: NativeName } | undefined,
    currencies: { [currencyCode: string]: Currency } | undefined,
    capital: string[] | undefined,
    tld: string[] | undefined,
    languages: { [languageCode: string]: string } | undefined
) => {
  
    const countryTld = tld && tld.length > 0  ? tld.join(', ') : 'N/A';

    const countryCapital = capital && capital.length > 0 ? capital.join(', ') : 'N/A'

    const countryLanguages = languages ? Object.values(languages).join(', ') : 'N/A'

    const countryCurrency = currencies
        ? Object.values(currencies)[0]?.name || 'N/A'
        : 'N/A'


    const countryNativeName = nativeName
        ? Object.keys(nativeName).find((code) => code !== 'eng')
            ? nativeName[Object.keys(nativeName).find((code) => code !== 'eng')!].common
            : nativeName['eng']?.common || 'N/A'
        : 'N/A'

    return { countryNativeName, countryCurrency, countryCapital, countryTld, countryLanguages }
}