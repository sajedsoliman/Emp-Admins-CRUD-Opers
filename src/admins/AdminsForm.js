import React, { useEffect } from 'react'

// components importing
import { Form, useForm } from "../commonComponents/useForm"
import Controls from "../commonComponents/controls/Controls"

// material components
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles'

// icons

// other imports
import adminsInfo from "./serviceFunction/adminsInfo"

const useStyles = makeStyles(theme => ({
    formActions: {
        display: "flex",
        flexDirection: "row-reverse",
        width: "100%",
        "& button:first-of-type": {
            marginLeft: 10
        }
    }
}))

export default function AdminsForm(props) {
    // props destructuring
    const { addAdminHandler, firedAdmin, editAdminHandler } = props

    // handle fired admin
    useEffect(() => {
        if (firedAdmin) {
            setAdmin(firedAdmin)
        }
    }, [])

    // validation function
    const validation = (firedInput = admin) => {
        const errors = {};
        if ("fullName" in firedInput) {
            errors.fullName = validationRule(firedInput.fullName.length >= 8, "Full Name must be 8 letters min")
        }
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if ("emailAddress" in firedInput) {
            errors.emailAddress = validationRule(emailRegex.test(firedInput.emailAddress), "Email Address must be a proper format")
        }
        if ("phoneNumber" in firedInput) {
            errors.phoneNumber = validationRule(firedInput.phoneNumber.length >= 10, "Phone Number must be 8 lenght min")
        }
        if ("department" in firedInput) {
            errors.department = validationRule(firedInput.department.length > 0, "You must have a department")
        }

        setErrors(errors)
        return Object.values(errors).every(input => input == "")
    }

    // validation rule function
    const validationRule = (condition, Msg) => {
        return condition ? "" : `${Msg}.`
    }

    // useForm imports
    const {
        values: admin,
        setValues: setAdmin,
        handleInputsChange,
        hanldeDateChange,
        validationErrors,
        setErrors,
        resetForm
    } = useForm(adminsInfo.initialValues, true, validation)


    // handle form submission
    const handleSubmission = () => {
        if (firedAdmin) {
            editAdminHandler(admin)
        } else {
            if (validation()) {
                addAdminHandler(admin)
                resetForm(adminsInfo.initialValues)
            }
        }
    }

    // handle reset
    const handleResetForm = () => {
        if (firedAdmin) {
            resetForm(firedAdmin)
        } else {
            resetForm(adminsInfo.initialValues)
        }
    }

    const classes = useStyles()

    return (
        <Form>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    {/* Personal Info */}
                    <Controls.TextInput value={admin.fullName}
                        name="fullName"
                        label="Full Name"
                        onChange={handleInputsChange}
                        validationError={validationErrors.fullName}
                    />
                    <Controls.TextInput value={admin.emailAddress}
                        name="emailAddress"
                        label="Email Address"
                        onChange={handleInputsChange}
                        validationError={validationErrors.emailAddress}
                    />
                    <Controls.TextInput value={admin.phoneNumber}
                        name="phoneNumber"
                        label="Phone Number"
                        onChange={handleInputsChange}
                        validationError={validationErrors.phoneNumber}
                        type="text"
                    />
                    <Controls.TextInput value={admin.village}
                        name="village"
                        label="Village"
                        onChange={handleInputsChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Other info */}
                    <Controls.ReusableRadioGroup items={adminsInfo.sexRadios}
                        label="Sex"
                        value={admin.sex}
                        name="sex"
                        onChangeHandle={handleInputsChange}
                    />
                    <Controls.SelectBoxInput items={adminsInfo.departments}
                        value={admin.department}
                        name="department"
                        label="Department"
                        validationError={validationErrors.department}
                        onChangeHanlde={handleInputsChange}
                    />
                    <Controls.DatePicker value={admin.dateOfHiring}
                        name="dateOfHiring"
                        label="Date Of Hiring"
                        changeDateHandler={handleInputsChange}
                    />
                    <Controls.ReusableCheckBox checkValue={admin.isSeasoned}
                        name="isSeasoned"
                        label="isSeasoned"
                        onChangeHandle={handleInputsChange}
                    />
                </Grid>
                <div className={classes.formActions}>
                    <Button color="inherit" variant="outlined" onClick={handleResetForm}>Reset</Button>
                    <Button color="primary" variant="outlined" onClick={handleSubmission}>Submit</Button>
                </div>
            </Grid>
        </Form>
    )
}
