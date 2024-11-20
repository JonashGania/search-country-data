import { getByRole, render, screen, waitFor } from '@testing-library/react'
import CountryPage from '@/pages/CountryPage'
import CountryDetails from '@/components/CountryDetails'
import ErrorPage from '@/pages/ErrorPage'
import GeoJsonMap from '@/components/GeoJsonMapping'
import SkeletonCountryDetails from '@/components/SkeletonCountryDetails'
import { BrowserRouter, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import userEvent from '@testing-library/user-event'

vi.mock('axios');
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: vi.fn(),
        useNavigate: vi.fn(),
    }
})

vi.mock('@/pages/ErrorPage', () => ({
    default: vi.fn(() => <div>Error Page</div>)
}))

vi.mock('@/components/GeoJsonMapping', () => ({
    default: vi.fn(() => <div>Geojson map</div>)
}))

vi.mock('@/components/CountryDetails', () => ({
    default: vi.fn(() => <div>country details</div>)
}))

vi.mock('@/components/SkeletonCountryDetails', () => ({
    default: vi.fn(() => <div>Skeleton</div>)
}))

const mockNavigate = vi.fn();

describe('CountryPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useParams as vi.Mock).mockReturnValue({ countryCode: 'USA' });
        (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
    })

    it('should display the loading skeleton while data is being fetched', async () => {
        (axios.get as vi.Mock).mockResolvedValueOnce({ data: [{}] });

        render(
            <BrowserRouter>
                <CountryPage />
            </BrowserRouter>
        )

        expect(screen.getByText('Skeleton')).toBeInTheDocument();
        await waitFor(() => expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/USA'))
    })

    it('should display country details on succesful fetch', async () => {
        (axios.get as vi.Mock).mockResolvedValueOnce({ data: [{cca3: 'USA'}] });

        render(
            <BrowserRouter>
                <CountryPage />
            </BrowserRouter>
        )

        await waitFor(() => expect(screen.getByText('country details')).toBeInTheDocument());
        expect(screen.getByText('Geojson map')).toBeInTheDocument();
    })

    it('should display the error page when fetch fails', async () => {
        (axios.get as vi.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

        render(
            <BrowserRouter>
                <CountryPage />
            </BrowserRouter>
        )

        await waitFor(() => expect(screen.getByText('Error Page')).toBeInTheDocument());
    })

    it('should navigate back when "Back" button is clicked', async () => {
        (axios.get as vi.Mock).mockResolvedValueOnce({ data: [{cca3: 'USA'}] });
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <CountryPage />
            </BrowserRouter>
        )

        const button = screen.getByRole('button', {name: /Back/i});
        await user.click(button);

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    })
})