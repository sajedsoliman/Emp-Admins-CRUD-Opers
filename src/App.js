import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

// material-ui imports
import { makeStyles } from '@material-ui/core/styles'

// components importing
import NotificationSnackbar from "./commonComponents/NotificationSnackbar"
import AppHeader from './mainComponents/AppHeader'
import EmployeesPage from './employees/EmployeesPage'
import AdminsPage from './admins/AdminsPage'
import useAlert from './commonComponents/useAlert'

// other imports
import "./dist/style.css"

const useStyles = makeStyles(theme => ({
    appWrapper: {
        display: "flex",
    },
    sidebar: {
        width: 300,
        height: "100vh",
        backgroundColor: "#34495e",
        [theme.breakpoints.down(650)]: {
            display: "none"
        }
    },
    snackbar: {
        top: 70
    },
    content: {
        width: "100%",
        maxHeight: "100vh",
        overflowY: "auto"
    },
    seachInput: {
        transition: "background-color .3s",
        borderRadius: 3,

        "&:hover": {
            backgroundColor: "rgba(255,255,255,0.75)"
        }
    },
}))

export default function App() {
    const classes = useStyles()

    const [pageTitle, setPageTitle] = useState("Employees")

    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])

    // alert settings
    const {
        notificationMsg,
        alertSeverity,
        closeAlert,
        processSettings
    } = useAlert()

    return (
        <div className={classes.appWrapper}>
            <aside className={classes.sidebar}></aside>
            <Router>
                <aside className={classes.content}>
                    {/* Notification Snackbar */}
                    <NotificationSnackbar onClose={closeAlert} classValue={classes.snackbar} alertSeverity={alertSeverity} notificationMsg={notificationMsg} />

                    {/* app header */}
                    <AppHeader />

                    {/* employees */}
                    <Route path="/" exact render={(props) => (
                        <EmployeesPage setPageTitle={setPageTitle} processSettings={processSettings} />)}
                    />

                    {/* employees */}
                    <Route path="/employees" render={(props) => (
                        <EmployeesPage setPageTitle={setPageTitle} processSettings={processSettings} />)}
                    />

                    {/* Admins */}
                    <Route path="/admins" render={(props) => (
                        <AdminsPage setPageTitle={setPageTitle} processSettings={processSettings}
                        />)}
                    />

                </aside>
            </Router>
        </div>
    )
}