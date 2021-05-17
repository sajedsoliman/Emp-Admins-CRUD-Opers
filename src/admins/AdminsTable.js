import React, { useState } from 'react'

// components
import useTable from '../commonComponents/useTable'
import ConfirmPopUp from '../commonComponents/ConfirmPopUp'
import adminsInfo from './serviceFunction/adminsInfo'

// material-ui components
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

// icons
import EditIcon from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';

const tableCellMinWidth = 200;
const useStyles = makeStyles(theme => ({
    adminsTable: {
        maxHeight: 450,
        overflowY: "auto",

        "& thead tr th, & tbody tr td": {
            minWidth: tableCellMinWidth,
            textAlign: "center"
        }
    },
    actionBtns: {

        "& button": {
            minWidth: 30,
            padding: "3px 10px",
            "&:first-child": {
                marginRight: 5
            }
        }
    },
    noAdminsMsg: {
        marginTop: 15,
        marginBottom: -10,
        textTransform: "capitalize",
        fontSize: "1rem"
    }
}))

export default function AdminsTable(props) {
    // props destructuring
    const { admins, firedAdminHandler, searchText, deleteAdminHandler } = props;

    // use states
    const [confrimFunc, setConfirmFunc] = useState({ isOpen: false, title: "Delete Admin Confirmation Message", subTitle: "You can't undo this action." })

    // Filtering Function
    const filteringHandle = (records) => {
        if (searchText == "") return records
        const searchRegex = new RegExp(searchText, "i")
        const filterdRecords = records.filter(record => record.fullName.search(searchRegex) != -1);

        return filterdRecords;
    }

    // import useTable
    const {
        recordsAfterFiltering,
        TblContainer,
        TblBody
    } = useTable(admins, filteringHandle, adminsInfo.tblHeaders, true)

    // delete admin handler
    const handleDeleteAdmin = (admin) => {
        setConfirmFunc({
            ...confrimFunc, isOpen: true, onConfirm: () => {
                deleteAdminHandler(admin)
                setConfirmFunc({ ...confrimFunc, isOpen: false })
            }
        })
    }

    // delete admin handler
    const handleEditAdmin = (admin) => {
        firedAdminHandler(admin)
    }

    // close confirm popup handler
    const handleCloseConfirmPopUp = () => {
        setConfirmFunc({ ...confrimFunc, isOpen: false })
    }

    const classes = useStyles()

    // map through admins
    const mappedAdmins = recordsAfterFiltering().map(admin => {
        const { id, fullName, emailAddress, phoneNumber, department } = admin;

        return (
            <TableRow key={id}>
                <TableCell>{fullName}</TableCell>
                <TableCell>{emailAddress}</TableCell>
                <TableCell>{phoneNumber}</TableCell>
                <TableCell>{department}</TableCell>
                <TableCell className={classes.actionBtns}>
                    <Button variant="outlined"
                        color="primary"
                        onClick={() => handleEditAdmin(admin)}><EditIcon /></Button>
                    <Button variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteAdmin(admin)}><Close /></Button>
                </TableCell>
            </TableRow>
        )
    })

    return (
        <>
            <TblContainer className={classes.adminsTable}>
                <TblBody>
                    {mappedAdmins.length == 0 ? <Typography className={classes.noAdminsMsg}>No admins to show</Typography> : mappedAdmins}
                </TblBody>
            </TblContainer>

            <ConfirmPopUp dialogFunc={confrimFunc} onClose={handleCloseConfirmPopUp} />
        </>
    )
}
