import { makeStyles, shorthands } from '@fluentui/react-components';

export const useStyles = makeStyles({
  thankYouContainer: {
    paddingTop: '1rem',
  },
  thankYouImage: {
    width: '32px',
    height: '32px',
    marginLeft: '1rem',
    ...shorthands.borderRadius('0.4rem'),
  },
  thankYouContentContainer: {
    fontSize: '14px',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: '20px',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    ...shorthands.gap('1rem'),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
});
