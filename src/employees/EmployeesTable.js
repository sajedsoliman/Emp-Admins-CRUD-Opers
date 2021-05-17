import React, { useState } from 'react'

// Material-ui imports
import { Button, TableRow, TableCell, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Close, Edit } from "@material-ui/icons"

// components importing
import ConfirmPopUp from '../commonComponents/ConfirmPopUp'
import useTable from '../commonComponents/useTable'
import emplyoeesInfo from './serviceFunctions/someInfo'

// related vars & funcs
const tableCellMinWidth = 200;
const useStyles = makeStyles(theme => ({
    employeesTable: {
        maxHeight: 380,
        overflowY: "auto",

        "& table thead tr th,& table tbody tr td": {
            minWidth: tableCellMinWidth
        }
    },
    employeeActions: {
        "& button": {
            minWidth: 40,
            padding: "3px 0",
            "&:first-child": {
                marginRight: 7
            }
        }
    },
    noRecordsMsg: {
        marginTop: 20
    }
}))


export default function EmployeesTable({ employees, deleteEmployeeHandler, toBeEditedEmplyoeeHandler, searchText }) {
    const [deleteConfirmDialog, setConfirmDialog] = useState({
        title: "Are you sure for deleting this employee?",
        subTitle: "You can't undo this action",
        isOpen: false
    })

    // makestyles hook for material-ui
    const classes = useStyles()

    // Filtering Function
    const filteringHandle = (records) => {
        if (searchText == "") return records
        else {
            const regex = new RegExp(searchText, "i")
            const filteredRecords = records.filter(record => {
                return record.name.search(regex) != -1
            });

            return filteredRecords;
        }
    }

    // import useTable
    const {
        recordsAfterFiltering,
        TblContainer,
        TblBody
    } = useTable(employees, filteringHandle, emplyoeesInfo.tableHeaders)

    // control delete employee dialog's apperence
    const closeDeleteDialogHandler = () => {
        setConfirmDialog(prev => ({
            ...prev,
            isOpen: false
        }))
    }

    // handle deleting employees
    const deleteEmployeeHandling = (id) => {
        closeDeleteDialogHandler()
        deleteEmployeeHandler(id)
    }

    // detete employee button click handling
    const deleteBtnClickHanlder = (employee) => {
        setConfirmDialog(prev => ({
            ...prev,
            isOpen: true,
            onConfirm: () => deleteEmployeeHandling(employee),
        }))
    }

    // show employee rows functionality
    const mappedEmployees = recordsAfterFiltering().map(employee => {
        const { id, name, email, phone, department } = employee;

        return (
            <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{department}</TableCell>
                <TableCell className={classes.employeeActions}>
                    <Button variant="outlined" color="secondary" onClick={() => deleteBtnClickHanlder(employee)}>
                        <Close />
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => toBeEditedEmplyoeeHandler(employee)}>
                        <Edit />
                    </Button>
                </TableCell>
            </TableRow>
        )
    })

    return (

        <>
            <TblContainer className={classes.employeesTable}>
                <TblBody>
                    {(recordsAfterFiltering().length != 0 ? mappedEmployees : <Typography className={classes.noRecordsMsg}>No Employees To Show</Typography>)}
                </TblBody>
            </TblContainer>

            {/* Delete Employee Dialog (put it here because it will have a problem if put inside a cell) */}
            <ConfirmPopUp
                dialogFunc={deleteConfirmDialog}
                onClose={closeDeleteDialogHandler}
            />
        </>

    )
}