import { EMPTY_STRING } from './common/helpers/Constants';

const dev = {
  TeamsAppId: '5fa2e1c9-28e5-4e24-9fde-35b708158747',
  clientId: '1b9dd9ce-b09a-431f-beb0-2aebcc4e950d',
  isOCVProduction: false,
  aiConnectionString: 'InstrumentationKey=4a8fb4e6-172a-4dba-b7e2-5deb79e24b45;IngestionEndpoint=https://westus2-0.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/;ApplicationId=5b62b3cd-3f26-414f-a9f6-0cb114a43b2e',
  clarityCode: "lywqa7clb3",
  defaultTokenScope: 'api://apd-dev-webapp.azurewebsites.net/1b9dd9ce-b09a-431f-beb0-2aebcc4e950d',
};

const prod = {
  TeamsAppId: '973c495d-8ae7-44d4-bb33-b16947ba44d3',
  clientId: 'ef4fd4b5-cf15-4edf-8f3b-231f022516f0',
  isOCVProduction: true,
  aiConnectionString: 'InstrumentationKey=43045ec9-177d-45c0-b4d0-f63ddb4dddab;IngestionEndpoint=https://westus2-0.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/;ApplicationId=3a128fd3-fbb6-4d95-8bd5-9e270a7fae4b',
  clarityCode: "lywqh4ih0j",
  defaultTokenScope: 'api://apd-prod-webapp.azurewebsites.net/ef4fd4b5-cf15-4edf-8f3b-231f022516f0/access_as_user',
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
  manageFlowsInDefaultEnvLink:
    'https://make.preview.powerautomate.com/environments/839eace6-59ab-4243-97ec-a5b8fcc104e4/flows',
  manageFlowsInPowerUserEnvLink:
    'https://make.powerautomate.com/environments/8a99a935-ac4b-4c03-8a49-20ec7ee56aab/flows',
  manageFlowsInProDevEnvLink: 'https://make.powerautomate.com/environments/7f0defc6-9dbe-4f62-9893-52abf0e9b56f/flows',
  manageAutomationsPlaceholderImgLink: 'https://imageassetssa.z5.web.core.windows.net/images/V2.0/Manage.png',
  faqLink:
    'https://microsoft.sharepoint.com/teams/ProductivityAutomationsforMicrosoftEmployees/SitePages/Task-Assistance-and-Automation-Hub-FAQs.aspx',
  privacyPolicyLink: 'https://privacy.microsoft.com/en-US/data-privacy-notice',
  termsOfUseLink: 'https://www.microsoft.com/en-us/servicesagreement',
  subscribeToGroupLink:
    'https://idwebelements.microsoft.com/GroupManagement.aspx?Group=automationhubusers&Operation=join',
  contactEmail: 'dawtaskaapms@microsoft.com',
  detectDuplicateFlows: "https://aka.ms/detectduplicateflow",
  joinTcaConsumerGroup: "https://aka.ms/jointcaconsumers",
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
