import { useEffect, useMemo, useState } from "react"
import Searchbar from "@/components/Searchbar";
import Dropdown from "@/components/Dropdown";
import CountryCard from "@/components/CountryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllCountries, fetchCountriesByRegion } from "@/api";
import { Country } from "@/interface";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Home = () => {
    const itemsPerPage = 15;
    const [countries, setCountries] = useState<Country[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const endIndex = startIndex + itemsPerPage;

    const displayedCountries = useMemo(
        () => countries.slice(startIndex, endIndex),
        [countries, startIndex, endIndex]
    );

    const loadCountries = async(region: string | null): Promise<void> =>  {
        setIsLoading(true)
        try {
            const data = region
                ? await fetchCountriesByRegion(region)
                : await fetchAllCountries()

            setCountries(data)
        } catch (error) {
            console.error('Failed to fetch countries', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    }

    useEffect(() => {
        loadCountries(null);
    }, [])

    const handleNext = () => {
        if (endIndex < countries.length) {
            setStartIndex((prev) => prev + itemsPerPage);
        }
        setIsLoading(true)

        setTimeout(() => setIsLoading(false), 300);
    }

    const handlePrevious = () => {
        if (startIndex > 0) {
            setStartIndex((prev) => prev - itemsPerPage);
        }
        setIsLoading(true)

        setTimeout(() => setIsLoading(false), 300);
    }

    const handleRegionChange = (region: string | null) => {
        setStartIndex(0);
        loadCountries(region)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
            <div className="flex flex-wrap tablet:flex-nowrap items-center justify-between gap-4">
                <Searchbar />
                <Dropdown onRegionChange={handleRegionChange} />
            </div>
            <div className="country-grid pt-12 pb-24">
                {isLoading ? (
                    Array.from({ length: itemsPerPage }).map((_, index) => (
                        <Skeleton key={index} className="w-full h-[250px] rounded-xl bg-gray-400 dark:bg-gray-800"/> 
                    ))
                ) : (
                    displayedCountries.map((country, index) => (
                        <CountryCard 
                            country={country} 
                            key={index} 
                            index={index}
                        />
                    ))
                )}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious 
                            data-testid="previous-button"
                            className={`${startIndex === 0 ? 'pointer-events-none opacity-60' : ''} text-lg font-medium cursor-pointer border border-transparent hover:border-gray-300 dark:hover:border-transparent dark:text-gray-100`} 
                            onClick={handlePrevious}
                        />
                    </PaginationItem>
                </PaginationContent>

                <PaginationContent>
                    <PaginationItem>
                        <PaginationNext 
                            data-testid="next-button"
                            className={`${endIndex >= countries.length ? 'pointer-events-none opacity-60' : ''} text-lg font-medium cursor-pointer border border-transparent hover:border-gray-300 dark:hover:border-transparent dark:text-gray-100`} 
                            onClick={handleNext}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default Home