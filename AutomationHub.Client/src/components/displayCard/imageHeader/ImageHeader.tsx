import { CardPreview } from '@fluentui/react-card';
import { Image } from '@fluentui/react-image';
import { IHeaderProps } from '../IHeaderProps';
import { useStyles } from './ImageHeader.styles';
import { mergeClasses } from '@fluentui/react-components';

export const ImageHeader: React.FC<IHeaderProps> = ({ cardData }: IHeaderProps) => {

    const styles = useStyles();

    return (
        <div className={mergeClasses(styles.cursorHover, styles.cardHeader)}>
            {cardData.cardImageUrl && (
                <CardPreview className={styles.cardHeaderImage}>
                    <Image src={cardData.cardImageUrl} alt="Card thumbnail preview" />
                </CardPreview>
            )}
            {cardData.cardIconUrl && (
                <header>
                    <Image className={styles.appIcon} src={cardData.cardIconUrl} alt="Card icon preview" />
                </header>
            )}
        </div>
    );
}