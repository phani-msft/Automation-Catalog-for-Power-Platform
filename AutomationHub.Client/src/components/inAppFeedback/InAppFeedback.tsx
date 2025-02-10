import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IFeedbackInitOptions, InAppFeedBackInfo } from '../../common/models/FeedbackTypes';
import {
  defaultFeedbackOptions,
  initializeInAppFeedback,
  onFeedbackDismiss,
  onFeedbackError,
  updateFeedbackOptions,
} from '../../common/helpers/OcvHelper';
import { TeamsFxContext } from '../../common/contexts/TeamsFxContext';
import { EventTypes } from '../../common/models/LoggingServiceTypes';
import ThankYouPopup from './ThankYouPopup';
import { InAppFeedbackProps } from './InAppFeedbackProps';
import config from '../../config';
import { LoggerContext } from '../../common/contexts/LoggerContext';

const InAppFeedback: React.FC<InAppFeedbackProps> = ({
  onSuccessSubmitFeedback,
  isFeedbackDisplayed,
  onDismissFeedback,
}) => {
  const { trackEvent, trackException } = useContext(LoggerContext);
  const [showThankYouPopup, setShowThankYouPopup] = useState<boolean>(false);

  const { themeString, context } = useContext(TeamsFxContext);

  /**
   * Callback function to be called on feedback dismiss.
   * @param isFeedbackSent A boolean value to indicate if the feedback is sent.
   */
  const onDismiss = useCallback(
    (isFeedbackSent?: boolean) => {
      trackEvent('DISMISS_FEEDBACK_CLICK', {
        eventType: EventTypes.USER_EVENT,
        eventName: 'dismissFeedbackClick',
        eventDetails: { isFeedbackSent },
      });
      onFeedbackDismiss(isFeedbackSent);
      onDismissFeedback(false);
    },
    [onDismissFeedback, trackEvent]
  );

  /**
   * Callback function to be called on error.
   * @param errorMessage The error message.
   */
  const onError = useCallback(
    (errorMessage?: string) => {
      trackEvent('FEEDBACK_SUBMIT_ERROR', {
        eventType: EventTypes.USER_EVENT,
        eventName: 'feedbackSubmitError',
        eventDetails: { errorMessage },
      });
      onFeedbackError(errorMessage);
      onDismissFeedback(false);
    },
    [onDismissFeedback, trackEvent]
  );

  /**
   * Callback function to be called on success.
   * @param clientFeedbackId The client feedback id.
   */
  const onSuccess = useCallback(
    (clientFeedbackId?: string) => {
      trackEvent('FEEDBACK_SUBMIT_SUCCESS', {
        eventType: EventTypes.USER_EVENT,
        eventName: 'feedbackSubmitSuccess',
        eventDetails: { clientFeedbackId },
      });
      onSuccessSubmitFeedback();
      setShowThankYouPopup(true);
    },
    [onSuccessSubmitFeedback, trackEvent]
  );

  /**
   * Callback function to be called on close of thank you popup.
   */
  const handleCloseThankYouPopup = () => {
    setShowThankYouPopup(false);
  };

  const feedbackOptions: IFeedbackInitOptions = useMemo(
    () => ({
      ...defaultFeedbackOptions,
      feedbackConfig: {
        ...defaultFeedbackOptions.feedbackConfig,
        featureAreas: [config.defaultFeatureArea],
        isDisplayed: isFeedbackDisplayed,
      },
      callbackFunctions: {
        onDismiss,
        onSuccess,
        onError,
      },
    }),
    [isFeedbackDisplayed, onDismiss, onError, onSuccess]
  );

  useEffect(() => {
    // update theme of OCV according to Teams theme
    const baseTheme = themeString === 'dark' ? 'TeamsDark' : themeString === 'contrast' ? 'M365Dark' : 'TeamsLight';
    feedbackOptions.themeOptions!.baseTheme = baseTheme;

    if (feedbackOptions.feedbackConfig) {
      // update tenant id, user id, and email in OCV
      feedbackOptions.feedbackConfig.email = context?.user.userPrincipalName;
      feedbackOptions.tenantId = context?.user.tenant.id;
      feedbackOptions.userId = context?.user.id;

      // if (!isLoading && !isError && data) {
      //   feedbackOptions.feedbackConfig.featureAreas = [
      //     config.defaultFeatureArea,
      //     ...data.map((category: CategoryData) => category.categoryTitle),
      //   ];
      // }
    }
    updateFeedbackOptions(feedbackOptions);
  }, [context, themeString, feedbackOptions]);

  useEffect(() => {
    const language: string = 'en';
    const feedbackInfo: InAppFeedBackInfo = {
      language: language,
      inAppFeedbackRef: 'centroRef-id',
    };
    initializeInAppFeedback(feedbackInfo, trackEvent, trackException);
  }, []);

  return (
    <div data-testid="inAppFeedbackDialog">
      <div id="centroRef-id" />
      <ThankYouPopup show={showThankYouPopup} onClose={handleCloseThankYouPopup} />
    </div>
  );
};

export default InAppFeedback;
