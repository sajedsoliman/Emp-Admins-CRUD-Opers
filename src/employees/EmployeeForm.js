import React, { useEffect, useState } from 'react'

// material-ui imports
import { Grid, makeStyles, Divider, Button } from "@material-ui/core"

// icons

// components import
import Controls from '../commonComponents/controls/Controls';
import { useForm, Form } from '../commonComponents/useForm';

// some info
import emplyoeesInfo from "./serviceFunctions/someInfo"


const useStyles = makeStyles(theme => ({
    employeeForm: {
        marginTop: 18,
    },
    formActions: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        "& button:first-child": {
            marginRight: 10
        }
    },
    formActionsDivider: {
        width: "calc(100% + 25px)",
        margin: "5px 1px 15px -14px",
    }
}))


export default function EmployeeForm({ open, addEmployeeHanlder, toBeEditedEmplyoee, editEmplyoeeHandler }) {
    const classes = useStyles()

    // to set the initial value for employee state
    useEffect(() => {
        if (toBeEditedEmplyoee != undefined) {
            setEmployee(toBeEditedEmplyoee)
        }
    }, [open])

    // form validation
    const validation = (updatedFieldValue = employee) => {
        const errors = {};
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if ("name" in updatedFieldValue) {
            errors.name = validateControl(updatedFieldValue.name.length > 5, "Full Name must be more than 5 letters");
        }
        if ("email" in updatedFieldValue) {
            errors.email = validateControl(emailRegex.test(updatedFieldValue.email), "Email is in bad format");
        }
        if ("phone" in updatedFieldValue) {
            errors.phoneNumber = validateControl(updatedFieldValue.phone.length >= 10, `Phone Number should be min 10 lenght`);
        }
        if ("department" in updatedFieldValue) {
            errors.department = validateControl(updatedFieldValue.department.length > 0, "You must choose a department");
        }
        setErrors(errors)

        return Object.values(errors).every(input => input === "")
    }

    // form validation related
    const validateControl = (condition, errorMsg) => {
        return condition ? "" : `${errorMsg}.`;
    }

    // useForm Exports
    const {
        values: employee,
        setValues: setEmployee,
        handleInputsChange,
        hanldeDateChange,
        validationErrors,
        setErrors,
        resetForm
    } = useForm(emplyoeesInfo.initialValues, true, validation)


    // handle add/edit employee
    const handleSubmitEmployee = () => {
        if (toBeEditedEmplyoee == undefined) {
            if (validation()) {
                addEmployeeHanlder(employee)
                setEmployee(emplyoeesInfo.initialValues)
            }
        } else {
            editEmplyoeeHandler(employee)
        }
    }

    // handle form reset
    const resetFormHandler = () => {
        if (toBeEditedEmplyoee == undefined || toBeEditedEmplyoee == null) {
            resetForm(emplyoeesInfo.initialValues)
        } else {
            resetForm(toBeEditedEmplyoee)
        }
    }

    return (
        <Form>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Controls.TextInput
                        {...{ validationError: validationErrors.name, inputChange: handleInputsChange, value: employee.name, label: "Full Name", name: "name" }} />
                    <Controls.TextInput
                        {...{ validationError: validationErrors.email, inputChange: handleInputsChange, value: employee.email, label: "Email Address", name: "email" }} />
                    <Controls.TextInput
                        {...{ validationError: validationErrors.phoneNumber, inputChange: handleInputsChange, value: employee.phone, label: "Mobile Number", name: "phone" }} />
                    <Controls.TextInput
                        {...{ validationError: validationErrors.city, validationInput: () => validation(), inputChange: handleInputsChange, value: employee.city, label: "City", name: "city" }} />
                </Grid>
                <Grid item xs={12} md={6}>

                    {/* Gender Radio Selection */}
                    <Controls.ReusableRadioGroup {...{ label: "Gender", value: employee.gender, onChangeHandle: handleInputsChange, name: "gender", items: emplyoeesInfo.genderRadios }} />

                    {/* Department Select Box */}
                    <Controls.SelectBoxInput value={employee.department}
                        onChangeHanlde={handleInputsChange}
                        validationError={validationErrors.department}
                        items={emplyoeesInfo.departments}
                        name="department"
                        label="Department"
                    />

                    {/* Hiring date pricker */}
                    <Controls.DatePicker value={employee.hireDate}
                        name="hireDate"
                        changeDateHandler={handleInputsChange}
                        label="Hiring Date"
                    />

                    {/* Checkbox isPermenent From-Control */}
                    <Controls.ReusableCheckBox checkValue={employee.isPermanent}
                        onChangeHandle={handleInputsChange}
                        label="Permenent Employee"
                        name="isPermanent"
                    />
                </Grid>
                {/* Form Actions */}
                <Divider className={classes.formActionsDivider} orientation="horizontal" variant="fullWidth" />
                <div className={classes.formActions}>
                    <Button variant="contained" color="primary" onClick={handleSubmitEmployee}>Submit</Button>
                    <Button variant="contained" color="default" onClick={resetFormHandler}>Reset</Button>
                </div>

            </Grid >
        </Form >
    )
}