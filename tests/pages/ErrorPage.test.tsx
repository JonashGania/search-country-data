import { render, screen } from '@testing-library/react'
import ErrorPage from '@/pages/ErrorPage'
import { BrowserRouter, useLocation, useRouteError } from 'react-router-dom'

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useLocation: vi.fn(),
        useRouteError: vi.fn(),
    }
})

describe('ErrorPage', () => {
    it('should display the state message when available', () => {
        (useLocation as vi.Mock).mockReturnValue({
            state: {message: 'custom error message'}
        })

        render(
            <BrowserRouter>
                <ErrorPage />
            </BrowserRouter>
        )

        expect(screen.getByText('custom error message')).toBeInTheDocument();
    })

    it('should display the pass "message" prop when provided', () => {
        render(
            <BrowserRouter>
                <ErrorPage message='Oops, page not found'/>
            </BrowserRouter>
        )

        expect(screen.getByText('Oops, page not found')).toBeInTheDocument();
    })

    it('should display the error status from useRouteError', () => {
        (useRouteError as vi.Mock).mockReturnValue({
            status: 404,
            message: 'page not found',
        })

        render(
            <BrowserRouter>
                <ErrorPage />
            </BrowserRouter>
        )

        expect(screen.getByText('Error - 404')).toBeInTheDocument();
    })

    it('should display the default message when no state or error is available', () => {
        (useLocation as vi.Mock).mockReturnValue({state: null});
        (useRouteError as vi.Mock).mockReturnValue(undefined);

        render(
            <BrowserRouter>
                <ErrorPage />
            </BrowserRouter>
        )

        expect(screen.getByText("Sorry, we couldn't find the page you were looking for.")).toBeInTheDocument();
        expect(screen.getByText('An unexpected error occured.')).toBeInTheDocument();
    })

    it('should render the "Go Back" button with a link to the home page', () => {
        render(
            <BrowserRouter>
                <ErrorPage />
            </BrowserRouter>
        )

        const button = screen.getByRole('button', { name: /Go Back/i });
        const link = screen.getByRole('link', { name: /Go Back/i } );

        expect(button).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    })
})