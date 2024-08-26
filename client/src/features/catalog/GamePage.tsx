/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardMedia, Grid, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchGameAsync, fetchGameCoverAsync, gameSelectors, removeProduct } from "./catalogSlice";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "../../app/components/Typography";
import { addGameCollectionItemAsync } from "../gameCollection/gameCollectionSlice";
import NotFound from "../../app/errors/NotFound";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";

export default function GamePage() {
    const dispatch = useAppDispatch();
    const [gameUrl, setGameUrl] = useState<string>("");
    const { id } = useParams<{ id: string }>();
    const game = useAppSelector(state => gameSelectors.selectById(state, parseInt(id!)));
    const noImage = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
    const { user } = useAppSelector(state => state.account);
    const navigate = useNavigate();

    useEffect(() => {
        if (!game && id) {
            dispatch(fetchGameAsync(parseInt(id)));
        }
    }, [dispatch, game, id]);

    useEffect(() => {
        if (game?.name) {
            dispatch(fetchGameCoverAsync(game.name)).unwrap()
                .then((url: string) => {
                    setGameUrl(url);
                })
                .catch((error: Error) => {
                    console.error("Error fetching game picture:", error);
                });
        }
    }, [dispatch, game?.name]);

    const handleAddButtonClick = (gameCondition: string) => {
        if (!user) {
            navigate('/sign-in');
        } else {
            dispatch(addGameCollectionItemAsync({ gameId: parseInt(id!), gameCondition }))
                .unwrap()
                .then(() => {
                    toast.success('Game added to collection!');
                })
                .catch((_error: any) => {
                    toast.error('You already have this game!');
                });
        }
    };
    const handleDeleteButtonClick = () => {
        agent.Catalog.removeGame(parseInt(id!)).then(() => {
            dispatch(removeProduct(parseInt(id!)));
            toast.success("Game deleted!");
            navigate('/catalog');
        }).catch(error => {
            console.log(error);
            toast.error("Something went wrong")
        })
    };

    if (!game) return <NotFound></NotFound>;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 10, mb: 20 }}>
            <Grid item xs={12} md={6}>
                <Card style={{ width: '100%', maxWidth: 600, margin: '1rem' }}>
                    <CardMedia
                        component="img"
                        style={{ height: '400px', width: '100%', objectFit: 'contain' }}
                        image={gameUrl || noImage}
                        alt={game.name || "No image available"}
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
                                        Loose Price: <span style={{ color: 'blue' }}>${game.loosePrice}</span>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleAddButtonClick("Loose")} variant="contained" color="primary" size="small" style={{ minWidth: '100px' }}>
                                        Add Loose
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" style={{ marginTop: '0.5rem' }}>
                                <Grid item xs>
                                    <Typography variant="body1" color="textPrimary">
                                        Complete Price: <span style={{ color: 'blue' }}>${game.completePrice}</span>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleAddButtonClick("Cib")} variant="contained" color="primary" size="small" style={{ minWidth: '100px' }}>
                                        Add Cib
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" style={{ marginTop: '0.5rem' }}>
                                <Grid item xs>
                                    <Typography variant="body1" color="textPrimary">
                                        New Price: <span style={{ color: 'blue' }}>${game.newPrice}</span>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleAddButtonClick("New")} variant="contained" color="primary" size="small" style={{ minWidth: '100px' }}>
                                        Add New
                                    </Button>
                                </Grid>
                            </Grid>
                            {user && !user.roles?.includes('Member') && <div>
                                <hr />
                                <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: '0.5rem' }}>
                                    <Grid item>
                                        <Button onClick={() => handleDeleteButtonClick()} variant="contained" color="primary" size="small" style={{ backgroundColor: "red", minWidth: '100px' }}>
                                            Delete game
                                        </Button>
                                    </Grid>
                                </Grid></div>}
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    )
}