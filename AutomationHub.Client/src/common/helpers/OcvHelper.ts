import {
  bootstrapFeature,
  ConfigUpdatedListener,
  DataSourceSetter,
  initialize,
  preloadFeature,
} from '@ms/centro-hvc-loader';
import { IRuntimeStaticConfig } from '@ms/centro-hvc-loader/dist/runtime/configuration/runtimeDataSources';
import { IAdapterProviderV3 } from '@ms/centro-hvc-loader/dist/runtime/bootstrap/adapter.types';

import {
  CentroEnvType,
  FeedbackAgeGroup,
  FeedbackAuthenticationType,
  IFeedbackInitOptions,
  FeedbackPolicyValue,
  FeedbackUiType,
  InAppFeedBackInfo,
} from '../models/FeedbackTypes';
import { CentroUrl, EMPTY_STRING } from './Constants';
import config from '../../config';
import { EventTypes, SeverityLevel } from '../models/LoggingServiceTypes';

let hvcDivId = 'centroRef-id';
let unmountFunction = () => { };

/**
 * Initialize feedback data with default values.
 */
const feedbackData: IFeedbackInitOptions = { appId: config.feedbackAppId };

/**
 * Function to get the HTML element to mount the HVC.
 * @param inAppFeedbackRef The HTML element id to mount the HVC.
 * @returns The HTML element to mount the HVC.
 */
const getDivToMountHvc = (inAppFeedbackRef?: string) => {
  let hvcDiv: HTMLElement | null = null;

  if (inAppFeedbackRef) {
    hvcDiv = document.getElementById(inAppFeedbackRef);
  }

  if (!hvcDiv) {
    hvcDiv = document.getElementById(hvcDivId);
  }

  if (!hvcDiv) {
    hvcDiv = document.createElement('div');
    hvcDiv.id = hvcDivId;
    document.body.appendChild(hvcDiv);
  }

  return hvcDiv;
};

/**
 * Function to get centro url based on environment.
 * @param env The environment type of centro.
 * @returns The centro url based on environment.
 */
const getCentroURL = (env: CentroEnvType): string => {
  switch (env) {
    case CentroEnvType.Local:
      return CentroUrl.Local;
    case CentroEnvType.CI:
      return CentroUrl.CI;
    case CentroEnvType.Prod:
    default:
      return CentroUrl.Prod;
  }
};

/**
 * Function to create runtime static configuration for centro.
 * @param appName The name of the app to be displayed in centro.
 * @param language The language of the app.
 * @returns The runtime static configuration for centro.
 */
const createRuntimeStaticConfig = (appName: string, language: string): IRuntimeStaticConfig => ({
  hostName: appName,
  locale: language,
  appId: EMPTY_STRING,
  perfPrefix: `OcvFeedback${appName}`,
});

/**
 * Function to register and unregister listener to Centro to enable dynamic data passing.
 */
const inAppFeedbackInitOptionsListener = (() => {
  // register listener to Centro to enable dynamic data passing
  const register = (
    listener?: ConfigUpdatedListener<IFeedbackInitOptions>
  ): Readonly<Partial<IFeedbackInitOptions>> => {
    if (listener) {
      listeners.push(listener);
    }
    return feedbackData;
  };

  // unregister listener from Centro
  const unregister = (listener: ConfigUpdatedListener<IFeedbackInitOptions>): void => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };

  // list of function provided to update Feedback configuration
  const listeners: ConfigUpdatedListener<IFeedbackInitOptions>[] = [];
  const updateFeedbackObject = (updatedInAppFeedbackInitOptions: IFeedbackInitOptions) => {
    Object.assign(feedbackData, updatedInAppFeedbackInitOptions);
    listeners.forEach((listener: ConfigUpdatedListener<IFeedbackInitOptions>) => listener(feedbackData));
  };

  return {
    register,
    unregister,
    updateFeedbackObject,
  };
})();

/**
 * Callback function to be called on feedback dismiss.
 * @param isFeedbackSent A boolean value to indicate if the feedback is sent.
 */
const onFeedbackDismiss = (isFeedbackSent?: boolean) => {
  feedbackData.feedbackConfig!.isDisplayed = false;
};

/**
 * Callback function to be called on error.
 * @param errorMessage The error message.
 */
const onFeedbackError = (errorMessage?: string) => {
  feedbackData.feedbackConfig!.isDisplayed = false;
};

/**
 * Function to create initial feedback data.
 * @returns The initial feedback data object with default values.
 */
const defaultFeedbackOptions: IFeedbackInitOptions = {
  appId: config.feedbackAppId,
  clientName: config.feedbackClientName,
  isProduction: config.isOCVProduction,
  authenticationType: FeedbackAuthenticationType.AAD,
  ageGroup: FeedbackAgeGroup.Adult,
  callbackFunctions: {
    onDismiss: onFeedbackDismiss,
    onSuccess: () => { },
    onError: onFeedbackError,
  },
  feedbackConfig: {
    email: 'youralias@microsoft.com',
    featureAreas: [config.defaultFeatureArea],
    feedbackUiType: FeedbackUiType.Modal,
    feedbackForumUrl: config.feedbackForumUrl,
    isDisplayed: false,
    isEmailCollectionEnabled: true,
    isFeedbackForumEnabled: false,
    isMyFeedbackEnabled: false,
    isScreenshotEnabled: false,
    isScreenRecordingEnabled: false,
    isThankYouPageDisabled: true,
    isFileUploadEnabled: false,
    privacyUrl: config.feedbackPrivacyURL,
    complianceChecks: {
      connectedExperiences: FeedbackPolicyValue.Enabled,
      policyAllowContact: FeedbackPolicyValue.Enabled,
      policyAllowContent: FeedbackPolicyValue.Enabled,
      policyAllowFeedback: FeedbackPolicyValue.Enabled,
      policyAllowScreenshot: FeedbackPolicyValue.Enabled,
      policyAllowSurvey: FeedbackPolicyValue.Enabled,
      policyEmailCollectionDefault: FeedbackPolicyValue.Enabled,
      policyScreenshotDefault: FeedbackPolicyValue.Enabled,
      policyContentSamplesDefault: FeedbackPolicyValue.Enabled,
    },
  },
  themeOptions: { baseTheme: 'TeamsLight' },
};

/**
 * Function to initialize In-App Feedback with the provided initialization info.
 * @param initializationInfo The initialization info for In-App Feedback.
 */
const initializeInAppFeedback = (initializationInfo: InAppFeedBackInfo, trackEvent, trackException) => {
  (async () => {
    // Unmounting and closing any previous instances of feedback
    unmountFunction();

    const { language, inAppFeedbackRef } = initializationInfo;

    const hostName = config.feedbackClientName;
    const initializationConfig = createRuntimeStaticConfig(hostName, language);

    const centroParams = {
      centroEnvironmentBaseUrl: getCentroURL(CentroEnvType.Prod),
      preConfig: initializationConfig,
      centroHvcData: EMPTY_STRING,
      forHostVersion: 'v2',
      hvcVersion: EMPTY_STRING,
    };

    try {
      await initialize(centroParams);
    } catch (e: any) {
      trackException(e, SeverityLevel.Error, {
        eventName: 'InAppFeedbackInitializationFailed',
        eventType: EventTypes.APP_EVENT,
      });
    }

    const dataSources = (sd: DataSourceSetter) => {
      sd('centro.hvc.feedback.initOptions', inAppFeedbackInitOptionsListener as any);
    };

    const centroAdapter: IAdapterProviderV3 = {
      dataSources,
    };

    const preloadParameter = { featureName: config.inAppFeedback, adapters: centroAdapter };

    try {
      await preloadFeature(preloadParameter);
    } catch (e: any) {
      trackException(e, SeverityLevel.Error, {
        eventName: 'InAppFeedbackInitializationFailed',
        eventType: EventTypes.APP_EVENT,
      });
    }

    const bootstrapper = await bootstrapFeature({
      featureName: config.inAppFeedback,
    });

    // Mounting the HVC on the provided HTML element
    unmountFunction = await bootstrapper.main(getDivToMountHvc(inAppFeedbackRef));
    trackEvent('INAPP_FEEDBACK_INITIALIZATION_SUCCESS', {
      eventType: EventTypes.APP_EVENT,
      eventName: 'InAppFeedbackInitializationSuccess',
    });
  })();
};

/**
 * Function to update feedback options.
 */
const updateFeedbackOptions = inAppFeedbackInitOptionsListener.updateFeedbackObject;

export {
  getCentroURL,
  createRuntimeStaticConfig,
  defaultFeedbackOptions,
  initializeInAppFeedback,
  updateFeedbackOptions,
  onFeedbackDismiss,
  onFeedbackError,
};
