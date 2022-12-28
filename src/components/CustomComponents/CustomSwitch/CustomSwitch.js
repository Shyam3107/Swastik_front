import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitches({ value, handleChange }) {

    const handleSwitchChange = (event) => {
        handleChange(event.target.checked);
    };

    return (
        <Switch
            checked={value}
            onChange={handleSwitchChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}
