import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

import breakpoints from '../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
    heightFitContent: {
        height: 'fit-content'
    },
    homeHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ...shorthands.margin('2%', '5%'),
        ...breakpoints.md({
            ...shorthands.margin('2%', '2%')
        })
    },
    welcomeText: {
        color: tokens.colorNeutralForegroundOnBrand,
        ...breakpoints.lg({
            display: 'none'
        })
    },
    searchBar: {
        marginLeft: "auto",
        width: "40%",
        ...breakpoints.lg({
            width: '60%'
        }),
        ...breakpoints.md({
            ...shorthands.margin('auto'),
            width: '100%'
        })
    },
    featuredCarousel: {
        ...shorthands.margin('1%', '2%')
    },
    divider: {
        ...shorthands.margin('2%'),
        width: 'auto'
    },
    categoriesStyles: {
        ...shorthands.margin('0%', '2%', '2%')
    }
})