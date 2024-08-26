/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Menu, Fade, MenuItem, Box } from "@mui/material";
import { useState } from "react";
import { signOut } from "../../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { Link } from "react-router-dom";
import { clearGameCollection } from "../../features/gameCollection/gameCollectionSlice";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button

                onClick={handleClick}
                sx={{ typography: 'h6', color: 'white' }}
            >
                {user?.username}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem component={Link} to="/collection">Profile</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(signOut());
                    dispatch(clearGameCollection());
                }}>Logout</MenuItem>
            </Menu>
        </Box>
    );
}