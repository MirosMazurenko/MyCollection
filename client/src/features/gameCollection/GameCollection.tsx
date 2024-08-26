/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import Typography from "../../app/components/Typography";
import { useEffect } from "react";
import EmptyCollection from "./EmptyCollection";
import GameCollectionList from "./GameCollectionList";
import { fetchGameCollectionAsync } from "./gameCollectionSlice";

export default function GameCollection() {
    const { gameCollection } = useAppSelector(state => state.gameCollection);
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchGameCollectionAsync());
    }, [dispatch, gameCollection.items]);

    if (!gameCollection?.items?.length) return <EmptyCollection />;

    const numberOfItems = gameCollection.items.length;

    const totalGamesByConsole = gameCollection.items.reduce((acc: any, item: any) => {
        acc[item.consoleName] = (acc[item.consoleName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const totalValue = gameCollection.items.reduce((sum: any, item: any) => {
        return sum + Math.max(item.loosePrice, item.completePrice, item.newPrice);
    }, 0);

    const totalGamesByCondition = gameCollection.items.reduce((acc: any, item: any) => {
        acc[item.gameCondition] = (acc[item.gameCondition] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const mostExpensiveGame = gameCollection.items.reduce((prev: any, current: any) => {
        const currentMaxPrice = Math.max(current.loosePrice, current.completePrice, current.newPrice);
        const prevMaxPrice = Math.max(prev.loosePrice, prev.completePrice, prev.newPrice);
        return currentMaxPrice > prevMaxPrice ? current : prev;
    });

    const consoleWithMostGames = Object.keys(totalGamesByConsole).reduce((a, b) =>
        totalGamesByConsole[a] > totalGamesByConsole[b] ? a : b
    );

    return (
        <>
            <Grid container spacing={4} sx={{ pb: 60 }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            textAlign="center"
                            sx={{
                                border: '2px solid black',
                                padding: '16px',
                                borderRadius: '8px'
                            }}>
                            Welcome, {user?.username}!
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3} >
                    <Paper sx={{ ml: 1, p: 2, boxShadow: 3 }}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            textAlign="center"
                            sx={{
                                border: '2px solid black',
                                padding: '16px',
                                borderRadius: '8px',
                                mb: 2
                            }}>
                            Game Collection Statistics
                        </Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Total Items:</strong> <span>{numberOfItems}</span>
                        </Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Total Value:</strong> <span>${totalValue.toFixed(2)}</span>
                        </Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Console with Most Games:</strong> <span>{consoleWithMostGames.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                        </Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Most Expensive Game:</strong> <span>{mostExpensiveGame.name} (${Math.max(mostExpensiveGame.loosePrice, mostExpensiveGame.completePrice, mostExpensiveGame.newPrice).toFixed(2)})</span>
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            <strong>Games by Console:</strong>
                        </Typography>
                        {Object.entries(totalGamesByConsole).map(([console, count]) => (
                            <Typography key={console} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>{console.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}:</strong> <span>{(count as number)} games</span>
                            </Typography>
                        ))}
                        <Typography sx={{ mt: 2 }}>
                            <strong>Games by Condition:</strong>
                        </Typography>
                        {Object.entries(totalGamesByCondition).map(([condition, count]) => (
                            <Typography key={condition} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>{condition}:</strong> <span>{(count as number)} games</span>
                            </Typography>
                        ))}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={9}>
                    <GameCollectionList items={gameCollection.items} />
                </Grid>
            </Grid>
        </>
    );
}