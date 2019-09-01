import React from 'react';
import Menu from '@material-ui/core/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MenuItem from '@material-ui/core/MenuItem';

const redirecturl = "https://cloud.ouraring.com/oauth/authorize?response_type=token&client_id=IFO2B5ELXS5YA6B3&redirect_uri=" + encodeURI(window.location.origin) + "&state="

export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div>
            <button className="button" onClick={handleClick}
            >
                <ExpandMoreIcon color="secondary" />
                <h5 > Connect with Oura Account</h5>
            </button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => window.location.href = redirecturl + './jacob.png'}>Jacob</MenuItem>
                <MenuItem onClick={() => window.location.href = redirecturl + './christer.png'}>Christer</MenuItem>
                <MenuItem onClick={() => window.location.href = redirecturl + './agnes.png'}>Agnes</MenuItem>
                <MenuItem onClick={() => window.location.href = redirecturl + './andreas.png'}>Andreas</MenuItem>
            </Menu>
        </div>
    );
}