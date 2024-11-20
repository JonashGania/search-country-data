import { fireEvent, render, screen } from '@testing-library/react'
import Searchbar from '@/components/Searchbar'
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { whereCountry } from 'iso-3166-1';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    }
})

vi.mock('iso-3166-1', () => ({
    whereCountry: vi.fn()
}))

const mockNavigate = vi.fn();
const mockWhereCountry = vi.fn();

describe('Searchbar', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
        (whereCountry as vi.Mock).mockImplementation(mockWhereCountry);
    });
    
    it('should render input and button', () => {
        render(
            <BrowserRouter>
                <Searchbar />
            </BrowserRouter>
        )

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByTestId('searchbar')).toBeInTheDocument();
    })

    it('should navigate to the correct country page when a valid country is searched', async () => {
        mockWhereCountry.mockReturnValue({ alpha3: 'USA'})
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <Searchbar />
            </BrowserRouter>
        )

        const searchInput = screen.getByTestId('searchbar');
        const searchButton = screen.getByRole('button');

        fireEvent.change(searchInput, { target: { value: 'United States of America' } });
        await user.click(searchButton);

        expect(mockWhereCountry).toHaveBeenCalledWith('United States of America');
        expect(mockNavigate).toHaveBeenCalledWith('/country/USA');
    })


    it('should navigate to the error page when an invalid country is searched', async () => {
        mockWhereCountry.mockReturnValue({ alpha3: null})
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <Searchbar />
            </BrowserRouter>
        )

        const searchInput = screen.getByTestId('searchbar');
        const searchButton = screen.getByRole('button');

        fireEvent.change(searchInput, { target: { value: 'invalid country' } });
        await user.click(searchButton);

        expect(mockWhereCountry).toHaveBeenCalledWith('invalid country');
        expect(mockNavigate).toHaveBeenCalledWith('/error', {
            state: {message: 'Could not find country. Please check your seached country.'}
        });
    })

    it('should trigger search when "Enter" is pressed', async () => {
        mockWhereCountry.mockReturnValue({ alpha3: "USA"})
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <Searchbar />
            </BrowserRouter>
        )

        const searchInput = screen.getByTestId('searchbar');
        fireEvent.change(searchInput, { target: { value: 'United States of America' } });
        await user.type(searchInput, '{enter}')

        expect(mockWhereCountry).toHaveBeenCalledWith('United States of America');
        expect(mockNavigate).toHaveBeenCalledWith('/country/USA');
    })
})