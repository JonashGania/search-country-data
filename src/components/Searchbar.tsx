import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { whereCountry } from "iso-3166-1";

const Searchbar = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        const countryName = searchValue.trim();
        if (!countryName) return;

        const countryCode = whereCountry(countryName)?.alpha3;
        if (countryCode) {
            navigate(`/country/${countryCode}`)
        } else {
            navigate('/error', {state: {message: 'Could not find country. Please check your seached country.'}})
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="max-w-full tablet:max-w-[400px] w-full flex rounded-md border border-transparent focus-within:border focus-within:border-gray-300 transition dark:bg-zinc-800 dark:focus-within:border-zinc-600">
            <div className="px-3 py-3">
                <button 
                    onClick={handleSearch}
                    className="grid items-center"
                >
                    <img src="/search-icon.svg" alt="search icon" />
                </button>
            </div>
            <input 
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown} 
                className="w-full outline-none border-none text-zinc-500 dark:text-gray-100 bg-transparent placeholder:text-gray-500 dark:placeholder:text-zinc-500" 
                autoComplete="off" 
                placeholder="Search for a country..."
            />
        </div>
    )
}

export default Searchbar