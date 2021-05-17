import { useState } from "react"

export default function useAlert() {
    const [notificationMsg, setNotification] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("")

    // close notification bar
    const closeAlert = () => {
        setNotification("")
    }

    // set procces value to true (DRY)
    const processSettings = (severity, msg) => {
        setAlertSeverity(severity)
        setNotification(msg)
    }

    return {
        notificationMsg,
        alertSeverity,
        processSettings,
        closeAlert
    }
}