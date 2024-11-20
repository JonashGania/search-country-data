import { render, screen } from '@testing-library/react'
import Dropdown from '@/components/Dropdown'
import userEvent from '@testing-library/user-event'

const mockOnRegionChange = vi.fn()

describe('Dropdown', () => {
    it('should render the dropdown with default text', () => {
        render(<Dropdown onRegionChange={mockOnRegionChange}/>)

        const button = screen.getByRole('button', {name: /filter by region/i});
        expect(button).toBeInTheDocument();
    })

    it('should toggles dropdown visibility when the button is clicked and close when clicked outside', async () => {
        const user = userEvent.setup();
        render(<Dropdown onRegionChange={mockOnRegionChange}/>)

        const button = screen.getByRole('button', {name: /filter by region/i});
        expect(screen.queryByRole('list')).not.toBeInTheDocument()

        await user.click(button);
        expect(screen.queryByRole('list')).toBeInTheDocument();

        await user.click(document.body);
        expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })

    it('should update selected region and calls onRegionChange when a region is selected', async () => {
        const user = userEvent.setup();
        render(<Dropdown onRegionChange={mockOnRegionChange}/>)

        const button = screen.getByRole('button', {name: /filter by region/i});
        await user.click(button);

        const asiaSelect = screen.getByText('Asia');
        await user.click(asiaSelect);

        expect(button).toHaveTextContent('Asia');

        expect(mockOnRegionChange).toHaveBeenCalledTimes(1);
        expect(mockOnRegionChange).toHaveBeenCalledWith('Asia');
    })
})