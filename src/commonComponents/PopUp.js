import React from 'react'

// material components
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

// icons
import Close from '@material-ui/icons/Close';

const classes = makeStyles(theme => ({
    dialog: {
        maxWidth: 750,
    },
    dialogTitle: {
        "& h2": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }
    },
    closeButton: {
        minWidth: 25,
        padding: "3px 8px"
    },
}))

export default function PopUp(props) {
    const { formFunc, closeHandle, children } = props;
    const { title, isOpen } = formFunc

    return (
        <Dialog open={isOpen} onClose={closeHandle} fullWidth classes={{ paperWidthSm: classes().dialog }}>
            <DialogTitle classes={{ root: classes().dialogTitle }}>
                <Typography gutterBottom={false}>{title}</Typography>
                <Button className={classes.closeButton}
                    variant="outlined"
                    color="secondary"
                    onClick={closeHandle}
                >
                    <Close />
                </Button>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    {children}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}
