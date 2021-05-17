import React, { useState } from 'react'


export function useForm(initialValues, validationOnInput = true, validation) {
    const [values, setValues] = useState(initialValues)
    const [validationErrors, setErrors] = useState({})

    // handle inputs change
    const handleInputsChange = (e) => {
        const { value, name, checked } = e.target;

        setValues((prev) => {
            return {
                ...prev, [name]: name == "isPermanent" || name == "isSeasoned" ? checked : value
            }
        })

        if (validationOnInput) {
            validation({ [name]: value })
        }
    }

    // reset form
    const resetForm = (values) => {
        setValues(values)
        setErrors({})
    }

    return {
        values,
        setValues,
        handleInputsChange,
        validationErrors,
        setErrors,
        resetForm
    }
}

export function Form(props) {
    const { children, ...otherAttributes } = props

    return (
        <form {...otherAttributes}>
            {children}
        </form>
    )
}