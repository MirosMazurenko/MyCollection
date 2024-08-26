import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    const handleAddItems = () => {
        navigate('/catalog');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Typography variant="h5" gutterBottom>
                Oops - we could not find what you are looking for...
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddItems}>
                Go back to catalog
            </Button>
        </Box>
    );
}