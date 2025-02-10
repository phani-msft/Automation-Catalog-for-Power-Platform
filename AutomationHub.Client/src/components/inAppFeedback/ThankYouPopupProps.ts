/**
 * Props for the ThankYouPopup component.
 * @interface ThankYouPopupProps
 */
export interface ThankYouPopupProps {
  /**
   * Determines whether the ThankYouPopup should be displayed or hidden.
   */
  show: boolean;

  /**
   * Callback function to close the ThankYouPopup when triggered.
   */
  onClose: () => void;
}
