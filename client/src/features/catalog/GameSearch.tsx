/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setGameParams } from "./catalogSlice";

export default function GameSearch() {
    const { gameParams } = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(gameParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setGameParams({ searchTerm: event.target.value }))
    }, 1000)

    return (
        <>
            <TextField
                label="Search games"
                variant="outlined"
                fullWidth
                value={searchTerm || ""}
                onChange={(event: any) => {
                    setSearchTerm(event.target.value);
                    debouncedSearch(event);
                }}
            />
        </>
    )
}