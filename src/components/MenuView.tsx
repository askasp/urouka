import React from 'react';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MenuItem from '@material-ui/core/MenuItem';

const redirecturl = "https://cloud.ouraring.com/oauth/authorize?response_type=token&client_id=VLIHHNEVF4PZ2ADJ&redirect_uri=" + window.location.origin + "&state="

export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div style={{}}> >
            <button style={{ backgroundColor: "#091630", display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center" }} onClick={handleClick}
            >
                <ExpandMoreIcon color="secondary" />
                <p className="top-card-subtitle" > Connect with Oura Account</p>
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
                <MenuItem onClick={() => window.location.href = redirecturl + './Andreas.png'}>Andreas</MenuItem>
            </Menu>
        </div>
    );
}