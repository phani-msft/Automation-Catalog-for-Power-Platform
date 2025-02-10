import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import ThankYouPopup from './ThankYouPopup';

describe('ThankYouPopup Component', () => {
  it('renders without errors', () => {
    renderWithProviders(<ThankYouPopup show={true} onClose={() => {}} />);
    expect(screen.getByText('Thank you for your feedback!')).toBeInTheDocument();
  });

  it('renders the popup when "show" is true', () => {
    renderWithProviders(<ThankYouPopup show={true} onClose={() => {}} />);

    // Check if the header title is rendered
    expect(screen.getByText('Thank you!')).toBeInTheDocument();

    // Check if the OK button is rendered
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('does not render the popup when "show" is false', () => {
    renderWithProviders(<ThankYouPopup show={false} onClose={() => {}} />);

    // Check if the popup is not in the document
    expect(screen.queryByText('Thank you for your feedback')).not.toBeInTheDocument();
  });

  it('calls onClose when the OK button is clicked', () => {
    const onCloseMock = jest.fn();
    renderWithProviders(<ThankYouPopup show={true} onClose={onCloseMock} />);

    // Click the OK button
    fireEvent.click(screen.getByText('OK'));

    // Check if onClose is called
    expect(onCloseMock).toHaveBeenCalled();
  });
});
