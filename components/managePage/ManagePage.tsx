import React from 'react';

import {
  Image,
  Menu,
  MenuButtonProps,
  MenuItemLink,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Text,
} from '@fluentui/react-components';
import { ChevronDown16Regular } from '@fluentui/react-icons';
import { app } from '@microsoft/teams-js';
import { useTranslation } from 'react-i18next';
import { useStyles } from './ManagePage.styles';
import config from '../../config';

const ManagePage: React.FC = () => {
  const { t } = useTranslation('ManagePage');
  const styles = useStyles();

  const manageAutomations = () => {
    app.openLink(config.manageFlowsInDefaultEnvLink);
  };

  const powerAutomateEnvironments = [
    {
      href: config.manageFlowsInDefaultEnvLink,
      text: t('powerAutomateDefaultEnv'),
    },
    {
      href: config.manageFlowsInPowerUserEnvLink,
      text: t('powerAutomatePowerUserEnv'),
    },
    {
      href: config.manageFlowsInProDevEnvLink,
      text: t('powerAutomateProDevEnv'),
    },
  ];

  return (
    <div className={styles.root} data-testid="manage-page">
      <div className={styles.iconWrapper}>
        <Image src={config.manageAutomationsPlaceholderImgLink} alt="Manage your automations" />
      </div>
      <div className={styles.textContainer}>
        <Text align="center" className={styles.title} data-testid="manage-header">
          {t('manageAutomationsHeader')}
        </Text>
        <Text weight="regular" align="center" className={styles.subTitle} data-testid="manage-content">
          {t('manageAutomationsContent')}
        </Text>
      </div>
      <div className={styles.manageButton}>
        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{ onClick: manageAutomations }}
                appearance="primary"
                menuIcon={<ChevronDown16Regular data-testid="more" />}
              >
                {t('continue')}
              </SplitButton>
            )}
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              {powerAutomateEnvironments.map((menuItem, index) => (
                <MenuItemLink href={menuItem.href} target="_blank" key={index} data-testid="link">
                  {menuItem.text}
                </MenuItemLink>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </div>
  );
};

export default ManagePage;
