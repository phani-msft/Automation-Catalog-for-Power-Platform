import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { InAppFeedbackProps } from './InAppFeedbackProps';
import InAppFeedback from './InAppFeedback';

// Mock useGetCategoriesData and useScreenSize hooks
jest.mock('../../hooks/useGetCategoriesData', () => ({
  useGetCategoriesData: () => ({
    data: [{ categoryTitle: 'Category 1' }, { categoryTitle: 'Category 2' }, { categoryTitle: 'Category 3' }],
    isLoading: false,
  }),
}));

describe('InAppFeedback Component', () => {
  // Define mock values for required props
  const mockProps: InAppFeedbackProps = {
    onSuccessSubmitFeedback: jest.fn(),
    isFeedbackDisplayed: true,
    onDismissFeedback: jest.fn(),
  };

  it('renders without errors', () => {
    renderWithProviders(<InAppFeedback {...mockProps} />);
    const inAppFeedbackDialog = screen.getByTestId('inAppFeedbackDialog');
    expect(inAppFeedbackDialog).toBeInTheDocument();
  });

  it('renders the component with "showThankYouPopup" initially set to false', () => {
    renderWithProviders(<InAppFeedback {...mockProps} />);

    // Check if the thank you popup is not initially displayed
    expect(screen.queryByText('Thank you for your feedback')).not.toBeInTheDocument();
  });
});
