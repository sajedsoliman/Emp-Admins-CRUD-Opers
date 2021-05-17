import React from 'react'

// material components
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';

// customized tooltip
const CustomLightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        padding: "5px 6px",
        textTransform: "uppercase"
    },
}))(Tooltip);

export default function LightTooltip(props) {
    const { children, title, placement, withArrow = false } = props

    return (
        <CustomLightTooltip title={title} placement={placement} arrow={withArrow}>
            {children}
        </CustomLightTooltip>
    )
}
