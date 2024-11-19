import { render, screen } from '@testing-library/react'
import CountryDetails from '@/components/CountryDetails'
import { BrowserRouter } from 'react-router-dom'

const mockCountryData = {
    name: {
        common: "Germany",
        nativeName: {
            deu: {
                official: "Bundesrepublik Deutschland",
                common: "Deutschland"
            }
        }
    },
    population: 83240525,
    region: "Europe",
    subregion: "Western Europe",
    capital: ["Berlin"],
    tld: ['.de'],
    cca3: "DEU",
    flags: { 
        svg: "https://flagcdn.com/de.svg", 
        alt: "The flag of Germany is composed of three equal horizontal bands of black, red and gold." 
    },
    currencies: {
        EUR: {
            name: "Euro",
            symbol: "€"
        }
    },
    languages: {
        deu: "German",
    },
    borders: ["AUT", "BEL"],
}

describe('CountryDetails', () => {
    it('should render country details correctly when props is passed', () => {
        render(
            <BrowserRouter>
                <CountryDetails countryData={mockCountryData}/>
            </BrowserRouter>
        )

        const countryCapital = mockCountryData.capital && mockCountryData.capital.length > 0 
                               ? mockCountryData.capital.join(', ') : 'N/A'
        const countryTld = mockCountryData.tld && mockCountryData.tld.length > 0  
                           ? mockCountryData.tld.join(', ') : 'N/A';
        const countryFlag = screen.getByRole('img');

        expect(countryFlag).toBeInTheDocument()
        expect(countryFlag).toHaveAttribute('src', mockCountryData.flags.svg);
        expect(countryFlag).toHaveAttribute('alt', mockCountryData.flags.alt);
        expect(screen.getByText(mockCountryData.name.common)).toBeInTheDocument();
        expect(screen.getByText(mockCountryData.name.nativeName.deu.common)).toBeInTheDocument();
        expect(screen.getByText('83,240,525')).toBeInTheDocument();
        expect(screen.getByText(mockCountryData.region)).toBeInTheDocument();
        expect(screen.getByText(mockCountryData.subregion)).toBeInTheDocument();
        expect(screen.getByText(countryCapital)).toBeInTheDocument();
        expect(screen.getByText(countryTld)).toBeInTheDocument();
        expect(screen.getByText(mockCountryData.currencies.EUR.name)).toBeInTheDocument();
        expect(screen.getByText(mockCountryData.languages.deu)).toBeInTheDocument();
    })
})