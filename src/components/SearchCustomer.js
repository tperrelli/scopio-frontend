import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchCustomer({onChange, options}) {

    return (
        <Autocomplete
            disablePortal
            id="search-user-combo"
            options={options}
            sx={{ width: 300 }}
            onChange={(event, value) => onChange(event, value)}
            renderInput={(params) => <TextField { ... params } label="Customer" /> }
        />
    );
}