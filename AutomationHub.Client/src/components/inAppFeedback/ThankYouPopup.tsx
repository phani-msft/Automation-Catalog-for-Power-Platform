import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Image,
  Text,
  Link,
  mergeClasses,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { ThankYouPopupProps } from './ThankYouPopupProps';
import { useStyles } from './ThankYouPopup.styles';
import config from '../../config';
import { useTranslation } from 'react-i18next';

const ThankYouPopup: React.FC<ThankYouPopupProps> = ({ show, onClose }) => {
  const { t } = useTranslation(['Common', 'ThankYouPopup']);
  const styles = useStyles();

  return (
    <Dialog
      modalType="alert"
      open={show}
      onOpenChange={(event, data) => {
        if (!data.open) {
          onClose();
        }
      }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle
            action={
              <DialogTrigger action="close" disableButtonEnhancement>
                <Button appearance="subtle" aria-label="close" icon={<Dismiss24Regular />} />
              </DialogTrigger>
            }
          >
            {t('ThankYouPopup:headerTitle')}
          </DialogTitle>
          <DialogContent>
            <div className={mergeClasses(styles.thankYouContainer, styles.row)}>
              <Image
                src="https://imageassetssa.z5.web.core.windows.net/images/color.png"
                className={styles.thankYouImage}
                alt="Thank you image"
              />
              <div className={mergeClasses(styles.thankYouContentContainer, styles.column)}>
                <Text>{t('ThankYouPopup:feedbackThankYou')}</Text>
                <Text>{t('ThankYouPopup:feedbackReview')}.</Text>
                <Text>
                  {t('ThankYouPopup:contactInformation')}&nbsp;
                  {config.contactEmail}.
                </Text>
                <Text>
                  {t('faq')}:&nbsp;
                  <Link href={config.faqLink} target="_blank" rel="noopener noreferrer">
                    {t('ThankYouPopup:link')}
                  </Link>
                </Text>
                <Text>
                  {t('ThankYouPopup:click')}&nbsp;
                  <Link href={config.subscribeToGroupLink} target="_blank" rel="noopener noreferrer">
                    {t('ThankYouPopup:here')}&nbsp;
                  </Link>
                  <Text>{t('ThankYouPopup:subscribeLinkText')}.</Text>
                </Text>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">{t('ok')}</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ThankYouPopup;
