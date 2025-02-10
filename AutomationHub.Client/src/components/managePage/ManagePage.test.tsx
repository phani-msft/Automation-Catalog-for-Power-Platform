import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import ManagePage from './ManagePage';

describe('ManagePage Component', () => {
  it('renders the component without errors', () => {
    renderWithProviders(<ManagePage />);
    expect(screen.getByTestId('manage-page')).toBeInTheDocument();
  });

  it('displays the title and subtitle', () => {
    renderWithProviders(<ManagePage />);
    const title = screen.getByTestId('manage-header');
    const subtitle = screen.getByTestId('manage-content');
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('displays the SplitButton', () => {
    renderWithProviders(<ManagePage />);
    const splitButton = screen.getByText('Continue');
    expect(splitButton).toBeInTheDocument();
  });

  it('displays the Power Automate environment links', () => {
    renderWithProviders(<ManagePage />);
    const splitButton = screen.getByTestId('more');
    fireEvent.click(splitButton);
    const links = screen.getAllByTestId('link');
    expect(links.length).toBe(3);
  });

  it('opens the Power Automate environment links in new tabs', () => {
    renderWithProviders(<ManagePage />);
    const splitButton = screen.getByTestId('more');
    fireEvent.click(splitButton);
    const links = screen.getAllByTestId('link');
    links.forEach((link: HTMLElement) => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', link.getAttribute('href')!);
      expect(link).toHaveAttribute('target', '_blank');
    });
  });
});
