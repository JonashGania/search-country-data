import { Country } from "@/interface"
import React from "react"
import { Link } from "react-router-dom";

interface CountryCardProps {
    country: Country;
    index: number;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, index }) => {
    const countryCapital = country.capital && country.capital.length > 0 ? country.capital.join(', ') : 'N/A'

    const formatCommaToNumber = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <Link
            to={`country/${country.cca3}`} 
            className='country-card opacity-0 fade-animation pb-6 rounded-md cursor-pointer'
            style={{
                animationDelay:`${index * 0.1}s`
            }}
        >
            <img 
                src={country.flags.svg} 
                alt={`${country.name.common} flag`} 
                className="w-full h-[152px] max-w-[250px] object-cover rounded-lg border border-slate-300 dark:border-zinc-600" 
            />
            <div className="px-4 pt-2 max-w-[250px]">
                <h3 className="text-lg font-semibold pb-2 text-black dark:text-gray-200 leading-5">{country.name.common}</h3>
                <h4 className="text-sm font-semibold text-black dark:text-gray-200">
                    Population: 
                    <span className="font-normal text-gray-600 dark:text-zinc-400"> {formatCommaToNumber(country.population)}</span>
                </h4>
                <h4 className="text-sm font-semibold text-black dark:text-gray-200">
                    Region: 
                    <span className="font-normal text-gray-600 dark:text-zinc-400"> {country.region}</span>
                </h4>
                <h4 className="text-sm font-semibold text-black dark:text-gray-200">
                    Capital: 
                     <span className="font-normal text-gray-600 dark:text-zinc-400"> {countryCapital}</span>
                </h4>
            </div>
        </Link>
    )
}

export default CountryCard