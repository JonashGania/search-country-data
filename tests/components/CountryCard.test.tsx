import { render, screen } from '@testing-library/react'
import CountryCard from '@/components/CountryCard'
import { Country } from '@/interface'
import { BrowserRouter } from 'react-router-dom'

const mockCountryData: Country = {
    name: { common: 'Germany' },
    capital: ['Berlin'],
    cca3: "DEU",
    region: "Europe",
    population: 83240525,
    flags: { svg: "https://flagcdn.com/de.svg"},
}

describe('CountryCard', () => {
    it('should render country card information correctly when props is passed', () => {
        render(
            <BrowserRouter>
                <CountryCard country={mockCountryData} index={1}/>
            </BrowserRouter>
        )
       
        const countryCapital = mockCountryData.capital && mockCountryData.capital.length > 0 
                               ? mockCountryData.capital.join(', ') : 'N/A'
        const countryFlag = screen.getByRole('img');

        expect(countryFlag).toBeInTheDocument();
        expect(countryFlag).toHaveAttribute('src', mockCountryData.flags.svg);
        expect(screen.getByText(mockCountryData.name.common)).toBeInTheDocument();
        expect(screen.getByText(countryCapital)).toBeInTheDocument();
        expect(screen.getByText(mockCountryData.region)).toBeInTheDocument();
        expect(screen.getByText('83,240,525')).toBeInTheDocument();
    })

    it('should handle missing capital gracefully', () => {
        const withoutCapital = {...mockCountryData, capital: []};
        render(
            <BrowserRouter>
                <CountryCard country={withoutCapital} index={1}/>
            </BrowserRouter>
        )

        expect(screen.getByText("Capital:")).toBeInTheDocument();
        expect(screen.getByText("N/A")).toBeInTheDocument();
    })

    it('should render Link with correct url', () => {
        render(
            <BrowserRouter>
                <CountryCard country={mockCountryData} index={1}/>
            </BrowserRouter>
        )
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `/country/${mockCountryData.cca3}`);    
    })
})