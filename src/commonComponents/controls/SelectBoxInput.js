import React from 'react'

// material imports
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

// icons
import DoneAll from '@material-ui/icons/DoneAll';

export default function SelectBoxInput(props) {
    const { onChangeHanlde, validationError, value, items, name, label } = props

    return (
        <TextField
            {...(validationError && { error: true, helperText: validationError })}
            onChange={onChangeHanlde}
            name={name}
            fullWidth
            variant="outlined"
            label={label}
            select
            margin="dense"
            size="small"
            value={value} >
            {items.map(item => {
                return <MenuItem key={item} value={item}>{item}</MenuItem>
            })}
        </TextField>
    )
}
