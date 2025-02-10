import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Text } from '@fluentui/react-components';
import { PersonFeedback24Regular, QuestionCircle24Regular, MoreHorizontal24Regular, Settings24Regular } from '@fluentui/react-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScreenSize } from '../../hooks/useScreenSize';
import { EventTypes } from '../../common/models/LoggingServiceTypes';
import { DEEPLINK_FEEDBACK, screenSizes } from '../../common/helpers/Constants';
import InAppFeedback from '../inAppFeedback/InAppFeedback';
import { useStyles } from './Navbar.styles';
import config from '../../config';
import DetectDuplicateFlowsPopup from '../detectDuplicateFlowsPopup/DetectDuplicateFlowsPopup';
import { DeepLinkContext } from '../../common/contexts/DeeplinkContext';
import { AppContext } from '../../common/contexts/AppContext';
import { LoggerContext } from '../../common/contexts/LoggerContext';

export default function Navbar() {
  const { trackEvent } = useContext(LoggerContext);
  const { isFeedbackDisplayed, setIsFeedbackDisplayed } = useContext(AppContext);
  const [isDetectDuplicateFlowsPopupDisplayed, setIsDetectDuplicateFlowsPopupDisplayed] = useState<boolean>(false);
  const { targetComponentId } = useContext(DeepLinkContext);
  const { t } = useTranslation(['Common', 'Navbar']);
  const classes = useStyles();
  const { width } = useScreenSize();
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (targetComponentId === DEEPLINK_FEEDBACK) {
      trackEvent('MENU_ITEM_CLICK', {
        eventType: EventTypes.USER_EVENT,
        eventName: 'menuItemClick',
        eventDetails: { menuItemId: 'feedback' },
      });
      setIsFeedbackDisplayed(true);
    }
  }, []);

  /**
   * show the inapp feedback dialog display.
   */
  const showFeedbackDialog = useCallback(() => {
    trackEvent('MENU_ITEM_CLICK', {
      eventType: EventTypes.USER_EVENT,
      eventName: 'menuItemClick',
      eventDetails: { menuItemId: 'feedback' },
    });
    setIsFeedbackDisplayed(true);
  }, [setIsFeedbackDisplayed, trackEvent, isFeedbackDisplayed]);

  /**
 * Toggle the duplicate flows detection popup
 */
  const toggleDetectDuplicateDetectionPopupDisplay = () => {
    trackEvent('MENU_ITEM_CLICK', {
      eventType: EventTypes.USER_EVENT,
      eventName: 'menuItemClick',
      eventDetails: { menuItemId: 'duplicateDetection' },
    });
    setIsDetectDuplicateFlowsPopupDisplayed((prev) => !prev);
  };

  const onSettingsClick = useCallback(() => {
    trackEvent('MENU_ITEM_CLICK', {
      eventType: EventTypes.USER_EVENT,
      eventName: 'menuItemClick',
      eventDetails: { menuItemId: 'settings' },
    });
    navigate('/Settings');
  }, [navigate, trackEvent]);

  const onHelpClick = useCallback(() => {
    trackEvent('MENU_ITEM_CLICK', {
      eventType: EventTypes.USER_EVENT,
      eventName: 'menuItemClick',
      eventDetails: { menuItemId: 'help' },
    });
    const newWindow = window.open(config.faqLink);
    if (newWindow) {
      newWindow.opener = null;
    }
  }, [trackEvent]);

  /**
   * Callback function to handle feedback dismissal.
   * @param isFeedbackDisplayed A boolean value to indicate if the feedback is displayed or not.
   */
  const handleDismissFeedback = useCallback(() => {
    setIsFeedbackDisplayed(false);
  }, [setIsFeedbackDisplayed]);

  /**
   * Callback function to handle feedback submission success.
   * @param clientFeedbackId The client feedback id.
   */
  const handleSuccessSubmitFeedback = useCallback((clientFeedbackId?: string) => {
    trackEvent('FEEDBACK_SUBMIT_SUCCESS', {
      eventType: EventTypes.USER_EVENT,
      eventName: 'feedbackSubmitSuccess',
      eventDetails: { clientFeedbackId },
    });
  }, [trackEvent]);

  const leftMenuItems = useMemo(() => {
    return [
      {
        id: 'home',
        label: t('Navbar:home'),
        onclick: () => {
          navigate('/');
        },
        paths: ['/', '/HomePage', '/Home', '/index.html', '/StaticContent/hometab/index.html'],
      },
      {
        id: 'manage',
        label: t('Navbar:manage'),
        onclick: () => {
          navigate('/Manage');
        },
        paths: ['/Manage'],
      },
      {
        id: 'about',
        label: t('Navbar:about'),
        onclick: () => {
          navigate('/About');
        },
        paths: ['/About'],
      },
    ];
  }, []);

  const rightMenuItems = useMemo(() => {
    return [
      // {
      //   id: 'detectDuplicateFlows',
      //   icon: <SquareMultiple24Regular className={classes.navbarRightMenuItemLink} data-testid="detectDuplicateFlowsIcon" />,
      //   label: t('Navbar:detectDuplicateFlowsPopup'),
      //   onclick: () => {
      //     toggleDetectDuplicateDetectionPopupDisplay();
      //   },
      //   showInNavbar: true
      // },
      {
        id: 'settings',
        icon: <Settings24Regular className={classes.navbarRightMenuItemLink} data-testid="settingsIcon" />,
        label: t('Navbar:settings'),
        onclick: () => {
          onSettingsClick();
        },
        showInNavbar: true
      },
      {
        id: 'feedback',
        icon: <PersonFeedback24Regular className={classes.navbarRightMenuItemLink} data-testid="feedbackIcon" />,
        label: t('Navbar:feedback'),
        onclick: () => {
          showFeedbackDialog();
        },
        showInNavbar: true,
      },
      {
        id: 'help',
        icon: <QuestionCircle24Regular className={classes.navbarRightMenuItemLink} data-testid="helpIcon" />,
        label: t('Navbar:help'),
        onclick: () => {
          onHelpClick();
        },
        showInNavbar: true,
      }
    ];
  }, [showFeedbackDialog, toggleDetectDuplicateDetectionPopupDisplay]);

  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.click();
    }
  };

  const renderFeedbackComponent = useCallback(() => {
    return (
      <InAppFeedback
        onSuccessSubmitFeedback={handleSuccessSubmitFeedback}
        isFeedbackDisplayed={isFeedbackDisplayed}
        onDismissFeedback={handleDismissFeedback}
      />
    );
  }, [isFeedbackDisplayed, handleSuccessSubmitFeedback, handleDismissFeedback]);

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <img className={classes.logoImg} src={config.ahLogo} alt="Logo" />
      </div>
      <div className={classes.navbarTitle}>
        <Text weight="bold" size={500}>
          {config.appTitle}
        </Text>
      </div>
      <div className={classes.navbarLeftMenu}>
        {leftMenuItems.map((item) => (
          <div key={item.id} className={`${classes.navbarMenuItem} ${item.paths?.includes(location.pathname) ? classes.navbarMenuItemActive : ''}`}>
            <span className={classes.navbarLeftMenuItemLink} onClick={item.onclick} tabIndex={1} onKeyDown={handleEnter}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className={classes.navbarRightMenu}>
        {width <= screenSizes.sm ? null : (
          <div className={classes.navbarRightSubMenu}>
            {rightMenuItems
              .filter((item) => item.showInNavbar)
              .map((item) => (
                <div key={item.id} title={item.label} className={classes.navbarMenuItem} onClick={item.onclick} onKeyDown={handleEnter} tabIndex={0}>
                  {item.icon}
                </div>
              ))}
          </div>
        )}
        {rightMenuItems
          .filter((item) => !item.showInNavbar || (width < screenSizes.sm && item.showInNavbar)).length > 0
          ? <Menu>
            <MenuTrigger disableButtonEnhancement>
              <div className={classes.navbarMenuItem} title={t('Navbar:more')}>
                <MoreHorizontal24Regular
                  className={classes.navbarRightMenuItemLink}
                  aria-label="More"
                  data-testid="moreIcon"
                />
              </div>
            </MenuTrigger>

            <MenuPopover>
              <MenuList data-testid="moreMenu">
                {rightMenuItems
                  .filter((item) => !item.showInNavbar || (width < screenSizes.sm && item.showInNavbar))
                  .map((item) => (
                    <MenuItem key={item.id} onClick={item.onclick}>
                      {item.label}
                    </MenuItem>
                  ))}
              </MenuList>
            </MenuPopover>
          </Menu>
          : <></>
        }
      </div>
      {
        renderFeedbackComponent()
      }
      <DetectDuplicateFlowsPopup showPopup={isDetectDuplicateFlowsPopupDisplayed} toggleDetectDuplicateDetectionPopupDisplay={toggleDetectDuplicateDetectionPopupDisplay} />
    </div>
  );
}
