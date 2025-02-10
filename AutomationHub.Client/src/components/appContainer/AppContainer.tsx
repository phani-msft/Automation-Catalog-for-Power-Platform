import { useStyles } from "./AppContainer.styles";
import Navbar from "../navbar/Navbar";
import { AHRouter } from "../AhRouter";
import { BrowserRouter } from "react-router-dom";
import withErrorBoundary from "../withErrorBoundary";
import { Spinner } from "@fluentui/react-components";
import ErrorBox from "../errorBox/errorBox";
import { useGetUserBasicData } from "../../hooks/useGetUserBasicData";
import { useUpdateLastVisitTime } from "../../hooks/useUpdateLastVisitTime";
import { useContext, useEffect, useState } from "react";
import { UserDetails } from "../../common/models/UserDetails";
import { UserContext } from "../../common/contexts/UserContext";
import { useGetUserMemberships } from "../../hooks/useGetUserMemberships";
import { UserMemberships } from "../../common/models/UserMemberships";
import { useTranslation } from "react-i18next";
import { clarity } from "clarity-js";
import config from "../../config";
import { EventTypes } from "../../common/models/LoggingServiceTypes";
import { LoggerContext } from "../../common/contexts/LoggerContext";

/**
 * The container which handles the initialization and routing
 * of the app.
 */
const _AppContainer = () => {
  const { trackEvent } = useContext(LoggerContext);
  const classes = useStyles();
  const { t } = useTranslation(['Common']);
  const [userDetails, setUserDetails] = useState<UserDetails>(undefined!);
  const [userMemberships, setUserMemberships] = useState<UserMemberships>(undefined!);

  const {
    isError: userBasicDataError,
    isLoading: userBasicDataIsLoading,
    isLoadingError: userBasicDataIsLoadingError,
    data: userBasicData
  } = useGetUserBasicData(setUserDetails);

  useGetUserMemberships(setUserMemberships);

  const { mutate: updateLastVisit } = useUpdateLastVisitTime();

  useEffect(() => {
    if (!userBasicDataIsLoading && !userBasicDataError && !userBasicDataIsLoadingError && userBasicData) {
      trackEvent('USER_DETAILS_LOADED', {
        eventType: EventTypes.APP_EVENT,
        eventName: 'userDetailsLoaded',
        eventDetails: {
          HasPDE: !!userBasicData.personalDevEnvId,
          IsFirstVisit: userBasicData.isFirstVisit
        }
      });
      updateLastVisit();
    }
  }, [userBasicDataIsLoading, userBasicDataError, userBasicDataIsLoadingError, userBasicData, updateLastVisit]);

  useEffect(() => {
    clarity.start({
      projectId: config.clarityCode,
      upload: "https://m.clarity.ms/collect",
      track: true,
      content: true
    });
  }, []);

  return (
    <div className={classes.root}>
      {userBasicDataIsLoading ?
        <Spinner />
        :
        userBasicDataError || userBasicDataIsLoadingError ?
          <ErrorBox errorTitle={t("errorMessage")} errorDescription={t("errorMessage")}></ErrorBox>
          :
          <div className="app-content">
            <BrowserRouter>
              <UserContext.Provider value={{ userBasicData: userDetails, userMemberships: userMemberships }}>
                <Navbar />
                <div id="main-content" className={classes.mainContent}>
                  <AHRouter />
                </div>
              </UserContext.Provider>
            </BrowserRouter>
          </div>
      }
    </div >
  );

}

export default withErrorBoundary(_AppContainer);
