import { render, screen } from '@testing-library/react'
import Header from '@/components/Header';
import { ThemeContext } from '@/context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockToggleDarkMode = vi.fn();

describe('Header', () => {
    it('should render the light mode logo and toggle button when isDarkMode is false', () => {
        render(
            <BrowserRouter>
                <ThemeContext.Provider value={{ isDarkMode: false, toggleDarkMode: mockToggleDarkMode }}>
                    <Header />
                </ThemeContext.Provider>
            </BrowserRouter>
        )
 
        const logo = screen.getByAltText('logo avatar');
        expect(logo).toHaveAttribute('src', '/light-logo.svg');

        const toggleButtonIcon = screen.getByAltText('moon icon');
        expect(toggleButtonIcon).toHaveAttribute('src', '/moon.svg');
    })

    it('should render the dark mode logo and toggle button when isDarkMode is true', () => {
        render(
            <BrowserRouter>
                <ThemeContext.Provider value={{ isDarkMode: true, toggleDarkMode: mockToggleDarkMode }}>
                    <Header />
                </ThemeContext.Provider>
            </BrowserRouter>
        )
 
        const logo = screen.getByAltText('logo avatar');
        expect(logo).toHaveAttribute('src', '/dark-logo.svg');

        const toggleButtonIcon = screen.getByAltText('sun icon');
        expect(toggleButtonIcon).toHaveAttribute('src', '/sun.svg');
    })

    it('should call toggleDarkMode when dark mode button is clicked', async () => {
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <ThemeContext.Provider value={{ isDarkMode: true, toggleDarkMode: mockToggleDarkMode }}>
                    <Header />
                </ThemeContext.Provider>
            </BrowserRouter>
        )

        const button = screen.getByRole('button');
        await user.click(button);

        expect(mockToggleDarkMode).toHaveBeenCalled();
    })
})