import { CountryDetailsInt }  from "@/interface"
import { getFormattedCountryDetails } from "@/utils/getFormattedCountryDetails";
import React from "react";
import { formatCountryCodes } from "@/utils/formatCountryCodes";

interface CountryDetailsProps {
    countryData: CountryDetailsInt;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ countryData }) => {
    const { countryNativeName, countryCurrency, countryCapital, countryTld, countryLanguages } = 
        getFormattedCountryDetails(
            countryData.name.nativeName, 
            countryData.currencies, 
            countryData.capital, 
            countryData.tld,
            countryData.languages
        )
    
    const countryBorders = formatCountryCodes(countryData.borders);

    const formatCommaToNumber = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className="flex flex-wrap laptop:flex-nowrap justify-center w-full gap-20">
            <div className="w-[550px] laptop:w-[50%]">
                <img 
                    src={countryData.flags.svg} 
                    alt={countryData.flags.alt} 
                    className="w-full max-h-[450px] rounded-lg border border-gray-300 dark:border-zinc-600"
                />
            </div>
            <div className="w-[550px] laptop:w-[50%]">
                <h2 className="text-[2rem] font-bold pb-6 text-black dark:text-gray-200">{countryData.name.common}</h2>
                <div className="flex flex-wrap phone:flex-nowrap w-full gap-8">
                    <div className="w-full phone:w-[50%]">
                        <h4 className="text-base font-semibold text-black dark:text-gray-200">
                            Native Name: 
                            <span className="font-normal text-gray-600 dark:text-zinc-400"> {countryNativeName}</span>
                        </h4>
                        <h4 className="text-base font-semibold text-black dark:text-gray-200">
                            Population: 
                            <span className="font-normal text-gray-600 dark:text-zinc-400"> {formatCommaToNumber(countryData.population)}</span>
                        </h4>
                        <h4 className="text-base font-semibold text-black dark:text-gray-200">
                            Region: 
                            <span className="font-normal text-gray-600 dark:text-zinc-400"> {countryData.region}</span>
                        </h4>
                        <h4 className="text-base font-semibold text-black dark:text-gray-200">
                            Sub Region: 
                            <span className="font-normal text-gray-600 dark:text-zinc-400"> {countryData.subregion ? countryData.subregion : 'N/A'}</span>
                        </h4>
                        <h4 className="text-base font-semibold text-black dark:text-gray-200">
                            Capital: 
                            <span className="font-normal text-gray-600 dark:text-zinc-400"> {countryCapital}</span>
                        </h4>
                    </div>

                    <div className="w-full phone:w-[50%]">
                        <h4 className="text-base font-semibold text-black dark:text-gray-200">
                            Top Level Domain: 
                            <span className="font-normal text-gray-600 dark:text-zinc-400"> {countryTld}</span>
                        </h4>
                        <h4 className="text-base font-semibold text-black dark:text-gray-200">
                            Currencies: 
                            <span className="font-normal text-gray-600 dark:text-zinc-400"> {countryCurrency}</span>
                        </h4>
                        <h4 className="text-base font-semibold text-black dark:text-gray-200">
                            Languages: 
                            <span className="font-normal text-gray-600 dark:text-zinc-400"> {countryLanguages}</span>
                        </h4>
                    </div>
                </div>

                <div className="flex flex-col phone:flex-row gap-4 pt-12 w-full">
                    <span className="text-base font-semibold text-black dark:text-gray-200">Border Countries: </span>
                    <ul className="flex gap-4 flex-1 flex-wrap">
                        {countryBorders && countryBorders.length > 0 ? (
                            countryBorders.map((border, index) => (
                                <li 
                                    className="bg-transparent py-1 px-4 text-gray-600 dark:text-zinc-400 text-sm shadow-lg border rounded-md border-gray-200 dark:border-zinc-600 dark:hover:bg-zinc-900" 
                                    key={index}
                                >
                                    {border}
                                </li>
                            ))
                        ) : (
                            <li className="bg-transparent py-1 px-4 text-gray-600 dark:text-zinc-400 text-sm">No Borders</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CountryDetails