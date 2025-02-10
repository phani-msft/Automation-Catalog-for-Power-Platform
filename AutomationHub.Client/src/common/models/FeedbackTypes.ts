import { Theme } from '@fluentui/react-components';

export enum FeedbackType {
  Smile = 'Smile',
  Frown = 'Frown',
  Idea = 'Idea',
  Unclassified = 'Unclassified',
}

export enum FeedbackAgeGroup {
  Undefined = 'Undefined',
  MinorWithoutParentalConsent = 'MinorWithoutParentalConsent',
  MinorWithParentalConsent = 'MinorWithParentalConsent',
  NotAdult = 'NotAdult',
  Adult = 'Adult',
  MinorNoParentalConsentRequired = 'MinorNoParentalConsentRequired',
}

export enum InAppFeedbackQuestionUiType {
  DropDown = 'DropDown',
  MultiSelect = 'MultiSelect',
  Rating = 'Rating',
  SingleSelect = 'SingleSelect',
}

export enum InAppFeedbackScenarioType {
  FeatureArea = 'FeatureArea',
  ResponsibleAI = 'ResponsibleAI',
  ChildFeedback = 'ChildFeedback',
  Experience = 'Experience',
  ProductSatisfaction = 'ProductSatisfaction',
  CrashImpact = 'CrashImpact',
  Custom = 'Custom',
  AIThumbsDown = 'AIThumbsDown',
  AIThumbsUp = 'AIThumbsUp',
}

export enum InAppFeedbackQuestionUiBehaviour {
  QuestionNotRequired = 'QuestionNotRequired',
  CommentNotRequired = 'CommentNotRequired',
  CommentRequiredWithLastOption = 'CommentRequiredWithLastOption',
}

export enum FeedbackAuthenticationType {
  MSA = 'MSA',
  AAD = 'AAD',
  Unauthenticated = 'Unauthenticated',
}

export enum FeedbackPolicyValue {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
  NotConfigured = 'Not Configured',
}

export enum FeedbackScreenshotInfoImageFormat {
  JPEG = 'jpeg',
  PNG = 'png',
}

export enum FeedbackScreenshotSourceType {
  AutoCapture = 'AutoCapture', // Default: used for normal web integration where the SDK is responsible for taking screenshot.
  AutoCaptureWithHtml2Canvas = 'AutoCaptureWithHtml2Canvas', // Used for web integration where the SDK is responsible for taking screenshot and displayMedia is not supported.
  ProvidedAtInitialization = 'ProvidedAtInitialization', // Used when hostapp provides the screeenshot one time when it is initialzed mainly used in mobile scenarios.
  DynamicallyProvided = 'DynamicallyProvided', // When screenshot is provided dynamically using callback, used in Win32 and Mac Scenarios.
}

export enum FeedbackUiType {
  SidePane = 'SidePane', // Default: Used for side pane/detail view
  Modal = 'Modal', // Used for modal view
  NoSurface = 'NoSurface', // Used when the surface is provided by the host app
  CallOut = 'CallOut', // Used for inscreen pop up dialogue
  NoSurfaceWithoutTitle = 'NoSurfaceWithoutTitle', // Used for inscreen pop up dialogue
}

export enum FeedbackHostPlatformType {
  Windows = 'Windows',
  IOS = 'iOS',
  Android = 'Android',
  WacTaskPane = 'WacTaskPane',
  MacOS = 'MacOS',
  Web = 'Web',
}

export const enum InitializationStatus {
  Success = 'Success',
  Error = 'Error',
  Warning = 'Warning',
}

export enum CentroEnvType {
  Prod,
  CI,
  Local,
}

export interface IFeedbackInitOptions {
  appId?: number; // Required, an ID that uniquely identify your app in OCV
  ageGroup?: FeedbackAgeGroup; // Must be dynamically fetched from the host app, Required if authentication type is MSA
  authenticationType?: FeedbackAuthenticationType; // Required and must be fetched by the host app
  callbackFunctions?: IFeedbackCallbackFunctions; // Set of callback funtions
  clientFeedbackId?: string; // If not provided we will generate a uuidv4 for this property
  clientName?: string; // Name of your app that has onboarded with Centro
  feedbackConfig?: IFeedbackConfig;
  isProduction?: boolean; // Determine which environment your feedback will be sent to in OCV
  telemetry?: IFeedbackTelemetry; // Telemetry is optional, the host app needs to set their own telemetry data
  tenantId?: string; // Must be dynamically fetched from the host app, required if authentication type is AAD
  themeOptions?: IThemeOptions; // Required to pass in the theme eg. 'WindowsLight'
  userId?: string; // Must be dynamically fetched from the host app, required if authentication type is AAD
}

export interface IFeedbackScreenshotInfo {
  providedScreenshotType?: FeedbackScreenshotSourceType;
  screenshotImageFormat?: FeedbackScreenshotInfoImageFormat;
  screenshotBase64?: string | string[];
}

export interface InitializationResult {
  status: InitializationStatus;
  timestamp?: number; // in UTC timestamp milliseconds
  loadTime?: number; // in milliseconds
  errorMessages?: string[];
  warningMessages?: string[];
}

export interface IFeedbackCallbackFunctions {
  attachDiagnosticsLogs?: (diagnosticsUploadId: string, diagnosticsEndpoint: string) => void; // callback function to upload diagnostics logs when feedback is submitted
  getContextData?: () => Promise<File[]>; // invoke when users click on a button to share contextual data
  initializationComplete?: (initializationCompleteResult: InitializationResult) => void; // callback function to notify host that initialization is complete
  onDismiss?: (isFeedbackSent?: boolean) => void; // invoke when feedback is dismissed true if feedback was sent otherwise false (UI)
  onSuccess?: (clientFeedbackId: string) => void; // invoke when feedback is sent
  onError?: (errorMessage?: string) => void; // invoke when fatal error occurs
  provideDynamicScreenshot?: () => Promise<IFeedbackScreenshotInfo>; // called if the screen shot is provided by the host application dynamically on this call
  supportCallback?: () => void; // invoke when contact support link is clicked
}

export interface IFeedbackConfig {
  appData?: string; // custom data to include in the feedback
  calloutTargetID?: string; // used for feedback ui callout type surface to target DOM element
  complianceChecks?: IFeedbackComplianceChecks;
  diagnosticsExplanationUrl?: string; // deprecated do not use
  diagnosticsConfig?: IFeedbackDiagnosticsConfig;
  email?: string; // must be dynamically fetched from the host app
  featureAreas?: string[]; // Categories to show up in the dropdown part, associate with OCV sub area value
  feedbackForumUrl?: string; // required if isFeedbackForumEnabled is true
  feedbackUiType?: FeedbackUiType;
  hostPlatform?: FeedbackHostPlatformType;
  initialFeedbackType?: FeedbackType; // if defined a single form feedback will be created
  isDisplayed?: boolean; // control the visibility of the HVC, not applicable to NoSurface ui type
  isEmailCollectionEnabled?: boolean; // to enable email colection
  isFeedbackForumEnabled?: boolean; // to enable feedback forum link
  isFileUploadEnabled?: boolean; // to enable file upload function
  isMyFeedbackEnabled?: boolean; // to enble my feedback link
  isScreenRecordingEnabled?: boolean; // to enable screenshot recording function
  isScreenshotEnabled?: boolean; // to enable screenshot function
  isShareContextDataEnabled?: boolean; // to enable share contextual data function
  isThankYouPageDisabled?: boolean; // to disable thank you page
  maxHeight?: number; // applicable for Modal and Callout ui types
  maxWidth?: number; // applicable for Modal and Callout ui types
  minHeight?: number; // applicable for Modal and Callout ui types
  minWidth?: number; // applicable for Modal and Callout ui types
  myFeedbackUrl?: string; // require if isMyFeedbackEnabled is true
  privacyUrl?: string; // url for privacy link
  retentionDurationDays?: number; // default 30 days, must be in range of 0 - 455
  scenarioConfig?: InAppFeedbackScenarioConfig; // option to set scenarios or categorisation form elements
  screenshotInfo?: IFeedbackScreenshotInfo;
  supportUrl?: string; // url for contact support link
  width?: number; // applicable for modal, side pane, and callout
}

export interface IFeedbackTelemetry {
  audience?: string;
  audienceGroup?: string;
  browser?: string; // Browser name.
  browserVersion?: string; // Browser version number.
  channel?: string;
  clientCountryCode?: string;
  dataCenter?: string; // Data center identifier.
  deviceId?: string;
  deviceType?: string;
  errorClassification?: string;
  errorCode?: string;
  errorName?: string;
  featureArea?: string;
  flights?: string;
  flightSource?: string;
  fundamentalArea?: string;
  installationType?: string;
  isUserSubscriber?: boolean;
  officeArchitecture?: string;
  officeBuild?: string;
  officeEditingLang?: number;
  officeUILang?: number;
  osBitness?: number;
  osBuild?: string;
  osUserLang?: number;
  platform?: string;
  processSessionId?: string;
  ringId?: number;
  sku?: string;
  sourceContext?: string;
  sourcePageName?: string; // Source web page name.
  sourcePageURI?: string; // Source web page URI.
  systemManufacturer?: string;
  systemProductName?: string;
}

// Details of the compliance checks https://www.owiki.ms/wiki/Working_with_feedback_policies
export interface IFeedbackComplianceChecks {
  // For MSA users rest of the variables are not valid
  // Allow the use of connected experiences in Office
  // Corresponds to L_ConnectedOfficeExperiences
  connectedExperiences?: FeedbackPolicyValue;
  // Allow Microsoft to follow up on feedback submitted by users
  // Corresponds to L_EmailCollection
  policyAllowContact: FeedbackPolicyValue;
  // Allow users to include log files and content samples when feedback is submitted to Microsoft
  // Corresponds to L_LogCollection
  policyAllowContent?: FeedbackPolicyValue;
  // Allow users to submit feedback to Microsoft
  // Corresponds to L_SendFeedback
  policyAllowFeedback: FeedbackPolicyValue;
  // Allow users to include screenshots and attachments when they submit feedback to Microsoft
  // Corresponds to L_Screenshot
  policyAllowScreenshot: FeedbackPolicyValue;
  // Allow users to receive and respond to in-product surveys from Microsoft
  // Corresponds to L_SendSurvey
  policyAllowSurvey?: FeedbackPolicyValue;
  // L_FeedbackOptionsDefaults
  // Sets the default behaviour for controls associated with L_EmailCollection
  policyEmailCollectionDefault?: FeedbackPolicyValue;
  // Sets the default behaviour for controls associated with L_Screenshot
  policyScreenshotDefault?: FeedbackPolicyValue;
  // Sets the default behaviour for controls associated with L_LogCollection
  policyContentSamplesDefault?: FeedbackPolicyValue;
}

export interface IFeedbackDiagnosticsConfig {
  attachDiagnostics?: (
    diagnosticsUploadId: string,
    diagnosticsEndpoint: string
  ) => any | Promise<IFeedbackDiagnosticsUploadResult>; // callback function to upload diagnostics logs when feedback is submitted
  diagnosticsEndPoint?: string;
  diagnosticsUploadId?: string;
  diagnosticsExplanationUrl?: string;
  isDiagnosticsIncluded?: boolean;
  waitForDiagnosticsUpload?: boolean;
  isShareContextDataEnabled?: boolean;
  getContextData?: () => Promise<File[]>;
  isHostManagedContextDataEnabled?: boolean;
  hostManagedContextDataExplanationUrl?: string;
  retreiveFormDataEnabled?: boolean;
  extractFeedbackDataForHost?: (
    feedbackData?: InAppFeedbackDataForHost
  ) => any | Promise<IFeedbackDiagnosticsUploadResult>;
}

export interface IFeedbackDiagnosticsUploadResult {
  diagnosticsUploadStatus: boolean;
}

export interface InAppFeedbackScenarioConfig {
  isScenarioEnabled?: boolean;
  scenarioType: InAppFeedbackScenarioType;
  questionDetails?: InAppFeedbackQuestion;
}

export interface InAppFeedbackQuestion {
  questionUiType?: InAppFeedbackQuestionUiType; // eg. DropDown, MultiSelect, Rating, SingleSelect
  questionInstruction?: InAppFeedbackCompositeString; // to set Question Instruction as a composite string
  questionOptions?: InAppFeedbackCompositeString[]; // to set Options as an array of composite string
  questionUiBehaviour?: InAppFeedbackQuestionUiBehaviour[]; // to set question validation behaviour
}

export interface InAppFeedbackCompositeString {
  displayedString: string;
  displayedStringInEnglish: string;
}

export interface InAppFeedbackElementOption {
  displayedText: string;
  displayedTextInEnglish: string;
  selected: boolean;
}

export interface InAppFeedbackResponseContent {
  displayLocale: string;
  elements: InAppFeedbackElement[];
  scenarioType?: string;
}

export interface InAppFeedbackElement {
  elementType: string;
  displayedQuestion: string;
  displayedQuestionInEnglish: string;
  userVerbatim?: string;
  userVerbatimRequested?: boolean;
  ratingScaleMin?: number;
  ratingScaleMax?: number;
  rating?: number;
  options?: InAppFeedbackElementOption[];
}

export interface InAppFeedbackDataForHost {
  feedbackType?: FeedbackType; // Smile/Frown
  responseContent?: InAppFeedbackResponseContent; // Data from the feedback form
  hostManagedContextDataConsent?: boolean; // consent for host managed context datas
  userEmail?: string; // user email from form if consent provided,
  diagnosticsUploadId?: string;
  diagnosticsEndPoint?: string;
  isDiagnosticsIncluded?: boolean;
}

export interface InAppFeedbackFormData {
  comment: string;
  email: string;
  featureArea?: string;
  feedbackType: FeedbackType;
  isEmailSelected: boolean;
}

export interface InAppFeedBackInfo {
  language: string; // locale of the HVC to be loaded, in BCP-47 format
  inAppFeedbackRef?: string; // a reference to DOM element, can pass in as a DOM object to render the hvc
}

export type ThemeType = string | Theme;

export interface IThemeOptions {
  baseTheme?: ThemeType; // Pre-defined theme or a custom theme
  colorScheme?: ThemeType; // Undefined, pre-defined theme color, or a new color theme.
}
