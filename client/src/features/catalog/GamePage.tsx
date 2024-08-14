/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardMedia, Grid, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchGameAsync, fetchGameCoverAsync, gameSelectors } from "./catalogSlice";
import { useParams } from "react-router-dom";
import Typography from "../../app/components/Typography";

export default function GamePage() {
    const dispatch = useAppDispatch();
    const [gameUrl, setGameUrl] = useState("");
    const { id } = useParams<{ id: string }>();
    const game = useAppSelector(state => gameSelectors.selectById(state, parseInt(id!)));
    const noImage = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

    useEffect(() => {
        if (!game && id) dispatch(fetchGameAsync(parseInt(id)));

        dispatch(fetchGameCoverAsync(game.name)).unwrap()
            .then((url: any) => {
                setGameUrl(url);
            })
            .catch((error: any) => {
                console.error("Error fetching game picture:", error);
            });
    }, [dispatch, game, id]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 10, mb: 20 }}>
            <Grid item xs={12} md={6}>
                <Card style={{ width: '100%', maxWidth: 600, margin: '1rem' }}>
                    <CardMedia
                        component="img"
                        style={{ height: '400px', width: '100%', objectFit: 'contain' }}
                        image={gameUrl ? gameUrl : noImage}
                        alt={game.name}
                    />
                    <CardContent>
                        <Typography variant="h5">{game.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {game.consoleName.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                        </Typography>
                        <div style={{ marginTop: '1rem' }}>
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography variant="body1" color="textPrimary">
                                        Loose Price: <span style={{ color: 'blue' }}>$ {game.loosePrice}</span>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" size="small">
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" style={{ marginTop: '0.5rem' }}>
                                <Grid item xs>
                                    <Typography variant="body1" color="textPrimary">
                                        Complete Price: <span style={{ color: 'blue' }}>$ {game.completePrice}</span>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" size="small">
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" style={{ marginTop: '0.5rem' }}>
                                <Grid item xs>
                                    <Typography variant="body1" color="textPrimary">
                                        New Price: <span style={{ color: 'blue' }}>$ {game.newPrice}</span>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" size="small">
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    )
}