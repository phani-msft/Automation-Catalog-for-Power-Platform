import { makeStyles, shorthands } from '@fluentui/react-components';
import breakpoints from '../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
  root: {
    ...shorthands.margin(0, 'auto'),
    textAlign: 'center',
  },
  iconWrapper: {
    ...shorthands.margin(0, 'auto'),
    textAlign: 'center',
    ...shorthands.padding('3rem'),
    '& > img': {
      ...shorthands.margin(0, 'auto'),
      textAlign: 'center',
      display: 'flex',
      width: '200px',
      ...breakpoints.md({
        width: '154px',
      }),
    },
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  title: {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '20px',
  },
  subTitle: {
    ...shorthands.margin(0, 'auto'),
    textAlign: 'center',
  },
  manageButton: {
    ...shorthands.margin('40px', 0),
    '& > div > button': {
      width: '280px',
    },
  },
});
