import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { CountryDetailsInt } from "@/interface"
import CountryDetails from "@/components/CountryDetails"
import ErrorPage from "./ErrorPage"
import SkeletonCountryDetails from "@/components/SkeletonCountryDetails"
import GeoJsonMap from "@/components/GeoJsonMapping"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const CountryPage = () => {
    const [countryData, setCountryData] = useState<CountryDetailsInt>()
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const { countryCode } = useParams<{ countryCode: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        async function getCountryDetails(): Promise<void> {
            setIsLoading(true)
            setHasError(false)
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
                const data = response.data[0];
                setCountryData(data);

                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            } catch (error) {
                console.error('Failed to fetch countries', error);
                setHasError(true)
            } finally {
                setIsLoading(false);
            }
        }

        if (countryCode) {
            getCountryDetails();
        }

    }, [countryCode, navigate])

    if (hasError) {
        return (
            <ErrorPage message="Country could not be found."/>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <Button
                onClick={() => navigate(-1)} 
                className="mt-12 py-5 rounded-md bg-white text-neutral-700 shadow-lg border border-gray-300 hover:bg-[rgba(209,213,219,0.4)] dark:hover:bg-[rgba(255,255,255,0.9)]"
            >
                <ChevronLeft/>Back
            </Button>
            <div className="pt-20">
                {isLoading ? (
                    <SkeletonCountryDetails />
                ) : (
                    countryData && (
                        <CountryDetails countryData={countryData}/>
                    )
                )}
            </div>
            <div className="w-full py-40 -z-20">
                {countryData && (
                    <GeoJsonMap countryCode={countryData?.cca3}/>
                )}
            </div>
        </div>
    )
}

export default CountryPage