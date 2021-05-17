import React, { useEffect, useState } from 'react'

import emplyoeesInfo from './serviceFunctions/someInfo'

// component importing
import EmployeesTable from '../employees/EmployeesTable'
import EmployeeForm from '../employees/EmployeeForm'
import PageHeader from '../commonComponents/PageHeader'
import PageSection from '../commonComponents/PageSection'

// material components
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

// icons
import Search from "@material-ui/icons/Search"
import Add from "@material-ui/icons/Add"
import PeopleAlt from "@material-ui/icons/PeopleAlt"
import PopUp from '../commonComponents/PopUp';
import Controls from '../commonComponents/controls/Controls';
import useLocalStorage from '../commonComponents/useLocalStorage'


export default function EmployeesPage({ processSettings, setPageTitle }) {
    const [search, setSearch] = useState("")
    const [employeeForm, setFormDialogOpen] = useState({ isOpen: false, title: "Employee Form" })
    const [toBeEditedEmplyoee, setToBeEditedEmplyoee] = useState(undefined)

    setPageTitle("Employees")

    // useLocalStorage for employees
    const [employees, updateEmployees] = useLocalStorage("emplyoees", emplyoeesInfo.testEmployees)

    // search employee by name
    const searchInputHandler = (e) => {
        setSearch(e.target.value)
    }

    const addEmployeeDialogHanlder = () => {
        setFormDialogOpen(prev => ({
            ...prev, isOpen: false
        }))
    }

    // add employee button click handler
    const handleAddEmployeeClick = () => {
        setToBeEditedEmplyoee(undefined)
        setFormDialogOpen(prev => ({
            ...prev, isOpen: true
        }))
    }

    // delete emplyoee function
    const deleteEmployeeHandler = (id) => {
        updateEmployees(id, "delete")
        processSettings("error", "Successfully Deleted")
    }

    // add employee functionailty
    const addEmployeeHanlder = (employee) => {
        updateEmployees(employee)
        addEmployeeDialogHanlder()
        processSettings("success", "Successfully Added")
    }

    // edit employee functionality
    const editEmplyoeeHandler = (emplyee) => {
        updateEmployees(emplyee, "edit")
        addEmployeeDialogHanlder()
        processSettings("info", "Successfully Edited")
    }

    // to be edited employee handling
    const toBeEditedEmployeeHandler = (employee) => {
        setToBeEditedEmplyoee(employee)
        setFormDialogOpen(prev => ({
            ...prev, isOpen: true
        }))
    }

    return (
        <>
            {/* page header */}
            <PageHeader
                icon={<PeopleAlt />}
                title={"All Employees"}
                subTitle={"List of employees with CRUD opertaions"} />

            {/* employees controls */}
            <PageSection>
                <div className="table-controls">
                    <Controls.TextInput value={search}
                        label="Search Employee"
                        onChange={searchInputHandler}
                        margin="regular"
                        InputProps=
                        {{
                            startAdornment:
                                (<InputAdornment position="start"><Search /></InputAdornment>)
                        }}
                    />
                    <Button
                        onClick={handleAddEmployeeClick}
                        variant="outlined"
                        color="primary"
                        startIcon={(<Add />)}>
                        Add New</Button>
                </div>
                {/* EmployeeForm dialog invocation */}
                <PopUp
                    formFunc={employeeForm}
                    closeHandle={addEmployeeDialogHanlder}
                >
                    <EmployeeForm open={employeeForm.isOpen} toBeEditedEmplyoee={toBeEditedEmplyoee} addEmployeeHanlder={addEmployeeHanlder} editEmplyoeeHandler={editEmplyoeeHandler} />
                </PopUp>


                <EmployeesTable
                    searchText={search}
                    toBeEditedEmplyoeeHandler={toBeEditedEmployeeHandler}
                    employees={employees}
                    deleteEmployeeHandler={deleteEmployeeHandler} />

            </PageSection>
        </>
    )
}
