import React, { useState } from 'react'

// material components
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Table from '@material-ui/core/Table';

// components importing
import TablePaginationActions from "./TableActionsPagination"

export default function useTable(records, filteringHandle, tableHeaders, isStickyHeader = false) {
    const recordsPerPageOptions = [4, 15, { value: -1, label: "All" }]
    const [page, setPage] = useState(0)
    const [recordsPerPage, setRecordsPerPage] = useState(4)

    // handle change records per page
    const recordsPerPageHandler = (e) => {
        setRecordsPerPage(parseInt(e.target.value))
    }

    // handle change page number
    const pageHandler = (e, newPage) => {
        setPage(newPage)
    }

    const TblPagination = () =>
    (
        <TablePagination rowsPerPage={recordsPerPage}
            rowsPerPageOptions={recordsPerPageOptions}
            count={records.length}
            page={page}
            onChangePage={pageHandler}
            onChangeRowsPerPage={recordsPerPageHandler}
            ActionsComponent={TablePaginationActions} />
    )

    const TblContainer = ({ children, ...otherAttributes }) =>
    (
        <TableContainer {...otherAttributes}>
            <Table {...(isStickyHeader && { stickyHeader: true })}>
                <TblHead />
                {children}
                <TableFooter>
                    <TableRow>
                        <TblPagination />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )

    const TblHead = () =>
    (
        <TableHead>
            <TableRow>
                {
                    tableHeaders.map(header => (
                        <TableCell>{header}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )

    // prepare records with filtering search
    const recordsAfterFiltering = () => {
        const startingPage = page * recordsPerPage;
        const filterdEmployees = (recordsPerPage > 0 ? filteringHandle(records).slice(startingPage, startingPage + recordsPerPage) : filteringHandle(records));
        return filterdEmployees
    }

    const TblBody = ({ children }) =>
    (
        <TableBody>
            {children}
        </TableBody>
    )

    return {
        recordsAfterFiltering,
        TblContainer,
        TblBody
    }
}