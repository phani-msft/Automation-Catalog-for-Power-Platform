import { EMPTY_STRING } from './common/helpers/Constants';

const dev = {
  TeamsAppId: '',
  clientId: '',
  isOCVProduction: false,
  aiConnectionString: '',
  clarityCode: "",
  defaultTokenScope: '',
};

const prod = {
  TeamsAppId: '',
  clientId: '',
  isOCVProduction: true,
  aiConnectionString: '',
  clarityCode: "",
  defaultTokenScope: '',
};

const envConfig = process.env.REACT_APP_ENV === 'production' ? prod : dev;

const inAppFeedbackConfig = {
  inAppFeedback: 'ocv-inapp-feedback',
  feedbackClientName: 'AutomationHub',
  defaultFeatureArea: 'Automation Hub',
  feedbackAppId: 2715,
  feedbackForumUrl: EMPTY_STRING,
  feedbackPrivacyURL: 'https://privacy.microsoft.com/en-GB/privacy-in-our-products',
};

const telemetryConfig = {
  serviceOffering: 'Finding',
  serviceLine: 'New Solutions',
  service: 'Task Completion Automation',
  componentName: 'MVP Automation Dashboard',
  componentId: '0633ffcc-9b34-4ec6-901e-745eef1849f2',
  ictoid: '1.0',
};

const appConfig = {
  manageFlowsInDefaultEnvLink: 'https://make.preview.powerautomate.com/',
  manageAutomationsPlaceholderImgLink: 'https://imageassetssa.z5.web.core.windows.net/images/V2.0/Manage.png',
  faqLink: '',
  privacyPolicyLink: 'https://privacy.microsoft.com/en-US/data-privacy-notice',
  termsOfUseLink: 'https://www.microsoft.com/en-us/servicesagreement',
  subscribeToGroupLink: '',
  contactEmail: '',
  joinTcaConsumerGroup: "",
  localizationPath: "/StaticContent/hometab/static/locales/{{lng}}/{{ns}}.json",
  shareIdeasImageUrl: "https://imageassetssa.z5.web.core.windows.net/images/V2.0/ShareIdeas.png",
  ahLogo: "https://imageassetssa.z5.web.core.windows.net/images/V2.0/ahLogo.png",
  catalogInstallUrl: (catalogItemId: string, pdeId: string) =>
    `https://make.preview.powerapps.com/environments/${pdeId}/catalog?autoPopupCardId=${catalogItemId}`,
  pdeCreationInstructionsUrl: "https://aka.ms/ahfaq#how-to-create-your-own-personal-dev-environment",
  ppacUrl: "https://aka.ms/ppac",
  msdefaultEnvId: "839eace6-59ab-4243-97ec-a5b8fcc104e4",
};

const config = {
  buildId: process.env.REACT_APP_BUILD_ID,
  appTitle: 'Automation Hub',
  authStartPage: 'auth-start.html',
  apiEndpoint: window.location.origin,
  ...envConfig,
  ...appConfig,
  ...inAppFeedbackConfig,
  ...telemetryConfig,
};

export default config;
