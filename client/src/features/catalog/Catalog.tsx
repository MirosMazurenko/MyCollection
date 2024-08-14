/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mui/material"
import CatalogFilters from "./CatalogFilters"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { fetchConsolesAsync, fetchGameCoverAsync, fetchGamesAsync, gameSelectors } from "./catalogSlice"
import { useEffect } from "react"
import CatalogList from "./CatalogList"
import CatalogPagination from "./CatalogPagination"

export default function Catalog() {
    const games = useAppSelector(gameSelectors.selectAll);
    const { consoles, gameParams, gamesLoaded, consolesLoaded, metaData } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!gamesLoaded) dispatch(fetchGamesAsync());

        dispatch(fetchGameCoverAsync("007 GoldenEye")).unwrap()
            .then((url: any) => {
                console.log("Game URL:", url); // Check the logged token
            })
            .catch((error: any) => {
                console.error("Error fetching access token:", error);
            });

    }, [dispatch, gamesLoaded, gameParams]);

    useEffect(() => {
        if (!consolesLoaded) dispatch(fetchConsolesAsync());
    }, [dispatch, consolesLoaded]);

    useEffect(() => {
        console.log('Games in Redux Store:', games);
    }, [games]);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={3} sx={{ borderRight: '1px solid #ddd' }}>
                <CatalogFilters consoles={consoles} gameParams={gameParams} />
            </Grid>
            <Grid item xs={12} md={9}>
                <CatalogList games={games} gamesLoaded={gamesLoaded} />
                <CatalogPagination metaData={metaData} />
            </Grid>
        </Grid>
    )
}