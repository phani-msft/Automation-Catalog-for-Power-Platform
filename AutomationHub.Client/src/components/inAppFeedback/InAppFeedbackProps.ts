/**
 * The props for the InAppFeedback component.
 * @interface InAppFeedbackProps
 */
export interface InAppFeedbackProps {
  /**
   * Callback function to be called when the feedback is submitted successfully.
   * @param clientFeedbackId The client feedback id returned from Centro.
   */
  onSuccessSubmitFeedback: (clientFeedbackId?: string) => void;

  /**
   * The flag to indicate if the feedback is displayed or not.
   */
  isFeedbackDisplayed: boolean;

  /**
   * Callback function to be called when the feedback is dismissed.
   * @param isFeedbackDisplayed A boolean value to indicate if the feedback is displayed or not.
   */
  onDismissFeedback: (isFeedbackDisplayed: boolean) => void;
}
