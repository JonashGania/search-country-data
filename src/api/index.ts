import { Country } from "@/interface"
import axios from "axios";
import { randomizeArray } from "@/utils/randomizeArray";

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async (): Promise<Country[]> => {
    const response = await axios.get(`${BASE_URL}/all`);
    const data = response.data;
    return randomizeArray(data);
}

export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
    const response = await axios.get(`${BASE_URL}/region/${region}`);
    return response.data;
}