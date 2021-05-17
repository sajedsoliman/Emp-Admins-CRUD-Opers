import React from 'react'

// material imports
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    pageHeaderIcon: {
        "& .MuiSvgIcon-root": {
            fontSize: "2rem",
            color: theme.palette.primary.main
        }
    },
}))

export default function PageHeader({ icon, title, subTitle: description }) {
    const classes = useStyles()

    return (
        <section className="top-content">
            <Container maxWidth="lg">
                <Paper className={`${classes.pageHeaderIcon} img`}>
                    {icon}
                </Paper>
                <div className="info">
                    <Typography>{title}</Typography>
                    <Typography color="textSecondary">{description}</Typography>
                </div>
            </Container>
        </section>
    )
}
