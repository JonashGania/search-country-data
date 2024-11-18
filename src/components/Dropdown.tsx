import { useEffect, useRef, useState } from "react";

interface DropdownProps {
    onRegionChange: (region: string | null) => void
}

const Dropdown = ({ onRegionChange }: DropdownProps) => {
    const regions = ['All', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'];
    const [selectShow, setSelectShow] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setSelectShow(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        return(() => {
            document.removeEventListener('click', handleClickOutside)
        })
    }, [])

    const handleToggleDropdown = () => {
        setSelectShow(!selectShow);
    }

    const handleRegionSelect = (region: string) => {
        const select = region === 'All' ? null : region;
        setSelectedRegion(select);
        setSelectShow(false)
        onRegionChange(select)
    }

    return (
        <div ref={dropdownRef} className="relative max-w-[185px] w-full">
            <button
                onClick={handleToggleDropdown} 
                className="flex items-center justify-between w-full py-2 px-4 border border-gray-200 dark:border-zinc-700 rounded-sm"
            >
                <span className="text-gray-600 dark:text-gray-100 text-sm">{`${selectedRegion === null ? 'Filter by Region' : selectedRegion}`}</span>
                <div>
                    <img src="/chevron-down.svg" alt="chevron down icon" />
                </div>
            </button>
            <div className={`${selectShow ? 'block' : 'hidden'} absolute right-0 bg-white dark:bg-black z-20 w-full px-2 rounded-md mt-2 border border-gray-200 dark:border-zinc-700 shadow-lg`}>
                <ul className="py-1">
                    {regions.map((region, index) => (
                        <li 
                            value={region}
                            key={index}
                            onClick={() => handleRegionSelect(region)}
                            className={`text-gray-800 dark:text-gray-100 px-3 py-1 text-sm cursor-pointer hover:bg-neutral-200 dark:hover:bg-[rgba(229,229,229,0.2)] rounded-sm`}
                        >
                            {region}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dropdown