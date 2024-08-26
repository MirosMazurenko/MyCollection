import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import { NavLink } from 'react-router-dom';
import SignedInMenu from './SignedInMenu';
import { useAppSelector } from '../store/configureStore';

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
};

function Header() {
    const { user } = useAppSelector(state => state.account);
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }} />
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        component={NavLink}
                        to="/"
                        sx={{ fontSize: 24 }}
                    >
                        {'mycollection'}
                    </Link>
                    {user ? <SignedInMenu /> : <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Link
                            color="inherit"
                            variant="h6"
                            underline="none"
                            component={NavLink}
                            to="/sign-in"
                            sx={rightLink}
                        >
                            {'Sign In'}
                        </Link>
                        <Link
                            variant="h6"
                            underline="none"
                            component={NavLink}
                            to="/register"
                            sx={{ ...rightLink, color: 'secondary.main' }}
                        >
                            {'Sign Up'}
                        </Link>
                    </Box>}
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

export default Header;