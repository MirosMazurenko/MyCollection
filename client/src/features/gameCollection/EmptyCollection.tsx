import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EmptyCollection() {
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
                Your collection is empty!
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddItems}>
                Add New Items
            </Button>
        </Box>
    );
}
