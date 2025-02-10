import React from 'react';
import { Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";
import { IDetectDuplicateFlowsPopupProps } from './IDetectDuplicateFlowsPopupProps';
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import { useStyles } from './DetectDuplicateFlowsPopup.styles';
import config from '../../config';

const DetectDuplicateFlowsPopup: (React.FC<IDetectDuplicateFlowsPopupProps>) = ({ showPopup, toggleDetectDuplicateDetectionPopupDisplay }) => {
    const { t } = useTranslation('DetectDuplicateFlowsPopup');
    const styles = useStyles();

    const buildDialogContent = () => {
        return `${t('detectDuplicateFlowsContent1')}<a href="${config.detectDuplicateFlows}" target="_blank">this</a>${t('detectDuplicateFlowsContent2')}<a href="${config.joinTcaConsumerGroup}" target="_blank">one-click-join</a>${t('detectDuplicateFlowsContent3')}`;
    };

    return <Dialog open={showPopup} onOpenChange={toggleDetectDuplicateDetectionPopupDisplay}>
        <DialogSurface>
            <DialogBody>
                <DialogTitle>
                    {t('detectDuplicateFlowsTitle')}
                </DialogTitle>
                <DialogContent>
                    <ReactMarkdown rehypePlugins={[rehypeRaw as any]} className={styles.root}>
                        {buildDialogContent()}
                    </ReactMarkdown>
                </DialogContent>
            </DialogBody>
        </DialogSurface>
    </Dialog>
};

export default DetectDuplicateFlowsPopup;