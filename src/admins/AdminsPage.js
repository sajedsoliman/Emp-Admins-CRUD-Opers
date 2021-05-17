import React, { useState } from 'react'

import adminsInfo from './serviceFunction/adminsInfo'

// components importing
import PageHeader from '../commonComponents/PageHeader'
import PageSection from '../commonComponents/PageSection';
import AdminsForm from './AdminsForm';
import AdminsTable from './AdminsTable';
import PopUp from '../commonComponents/PopUp';
import useLocalStorage from '../commonComponents/useLocalStorage';
import Controls from '../commonComponents/controls/Controls';

// material components
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles'

// icons
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';


// styles import
import "../styles/dist/main.css"

const classes = makeStyles(theme => ({}))

export default function AdminsPage(props) {
    const [activeAdmin, setActiveAdmin] = useState(null)
    const [search, setSearch] = useState("")
    const [formFunc, setFormFunc] = useState({ isOpen: false, title: "Admin Form" })

    // props destructuring
    const { processSettings, setPageTitle } = props

    setPageTitle("Admins")

    // useLocalStorage for employees
    const [admins, updateAdmins] = useLocalStorage("admins", adminsInfo.testAdmins)

    // handle search input changing
    const searchTextChageHandler = (e) => {
        setSearch(e.target.value)
    }

    // close form handler
    const closeFormDialogHandler = () => {
        setFormFunc(prev => ({
            ...prev, isOpen: false
        }))
    }

    // open form handler
    const handleAddAdminClick = () => {
        setFormFunc(prev => ({
            ...prev, isOpen: true
        }))
    }

    // add admin handler
    const addAdminHandler = async (admin) => {
        closeFormDialogHandler()
        processSettings("success", "Successfully Added")
        updateAdmins(admin)
    }

    // delete admin handler
    const deleteAdminHandler = (admin) => {
        updateAdmins(admin, "delete")
        processSettings("error", "Successfully Deleted")
    }

    // edit admin Handler
    const editAdminHandler = (admin) => {
        updateAdmins(admin, "edit")
        processSettings("info", "Successfully Edited")
        closeFormDialogHandler()
        setActiveAdmin(null)
    }

    // change fired admin handler
    const activeAdminHandler = (admin) => {
        setActiveAdmin(admin)
        handleAddAdminClick()
    }

    return (
        <section>
            {/* Page Header */}
            <PageHeader
                icon={<RecordVoiceOver />}
                title="Admins Page"
                subTitle="List of all admins employed by the boss"
            />

            <PageSection>
                <div className="table-controls">
                    {/* Admins table controls */}
                    <Controls.TextInput value={search}
                        onChange={searchTextChageHandler}
                        margin="regualr"
                        label="Search Admins"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><Search /></InputAdornment>
                            )
                        }}
                    />

                    {/* Add admin button */}
                    <Button variant="outlined"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleAddAdminClick}
                    >Add New</Button>
                </div>

                {/* add/edit aadmin form (popup) */}
                <PopUp formFunc={formFunc} closeHandle={closeFormDialogHandler}>
                    <AdminsForm
                        editAdminHandler={editAdminHandler}
                        firedAdmin={activeAdmin}
                        addAdminHandler={addAdminHandler} />
                </PopUp>

                {/* admins table */}
                <AdminsTable
                    admins={admins}
                    searchText={search}
                    firedAdminHandler={activeAdminHandler}
                    deleteAdminHandler={deleteAdminHandler}
                    editAdminHandler={editAdminHandler}
                    handleEditAdminClick={handleAddAdminClick}
                />

            </PageSection>

        </section>
    )
}


// Set up admins form (inital Values)