/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Game, GameParams } from "../../app/models/game";
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

interface CatalogState {
    gamesLoaded: boolean;
    consolesLoaded: boolean;
    status: string;
    consoles: string[];
    gameParams: GameParams;
    metaData: MetaData | null;
    accessToken: string | null;
}

const gamesAdapter = createEntityAdapter<Game>();

function getAxiosParams(gameParams: GameParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", gameParams.pageNumber.toString());
    params.append("pageSize", gameParams.pageSize.toString());
    params.append("orderBy", gameParams.orderBy);
    if (gameParams.searchTerm) params.append("searchTerm", gameParams.searchTerm);
    if (gameParams.consoles?.length > 0) params.append("consoles", gameParams.consoles.toString());
    return params;
}

export const fetchGamesAsync = createAsyncThunk<Game[], void, { state: RootState }>(
    "catalog/fetchGamesAsync",
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.gameParams);
        try {
            const response = await agent.Catalog.getList(params);
            thunkAPI.dispatch(setMetadata(response.metaData));
            return response.items;
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const fetchGameAsync = createAsyncThunk<Game, number>(
    "catalog/fetchGameAsync",
    async (productId, thunkAPI) => {
        try {
            return agent.Catalog.getGame(productId);
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchConsolesAsync = createAsyncThunk(
    "catalog/fetchConsolesAsync",
    async (_, thunkAPI) => {
        try {
            return agent.Catalog.getConsoles();
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchAccessTokenAsync = createAsyncThunk(
    "catalog/fetchAccessTokenAsync",
    async (_, thunkAPI) => {
        try {
            const response = await agent.IGDB.getAccessToken();
            const accessToken = response.access_token;
            return accessToken;
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchGameCoverAsync = createAsyncThunk<string, string>(
    "catalog/fetchGameCoverByNameAsync",
    async (gameName, thunkAPI) => {
        try {
            const response = await agent.IGDB.getGameCover(gameName);
            const gameUrl = response.coverUrl;
            return gameUrl;
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 20,
        orderBy: "name",
        consoles: [],
    }
}

export const catalogSlice = createSlice({
    name: "catalog",
    initialState: gamesAdapter.getInitialState<CatalogState>({
        gamesLoaded: false,
        consolesLoaded: false,
        status: 'idle',
        consoles: [],
        gameParams: initParams(),
        metaData: null,
        accessToken: null,
        // gameCovers: {},
    }),
    reducers: {
        setGameParams: (state, action) => {
            state.gamesLoaded = false;
            state.gameParams = { ...state.gameParams, ...action.payload, pageNumber: 1 };
        },
        setPageNumber: (state, action) => {
            state.gamesLoaded = false;
            state.gameParams = { ...state.gameParams, ...action.payload };
        },
        setMetadata: (state, action) => {
            state.metaData = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        removeProduct: (state, action) => {
            gamesAdapter.removeOne(state, action.payload);
            state.gamesLoaded = false;
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchGamesAsync.pending, (state) => {
            state.status = 'pendingFetchGames';
        });
        builder.addCase(fetchGamesAsync.fulfilled, (state, action) => {
            gamesAdapter.setAll(state, action.payload);
            state.gamesLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchGamesAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });


        builder.addCase(fetchGameAsync.pending, (state) => {
            state.status = 'pendingFetchGame';
        });
        builder.addCase(fetchGameAsync.fulfilled, (state, action) => {
            gamesAdapter.setOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchGameAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });


        builder.addCase(fetchConsolesAsync.pending, (state) => {
            state.status = 'pendingFetchConsoles';
        });
        builder.addCase(fetchConsolesAsync.fulfilled, (state, action) => {
            state.consoles = action.payload.consoles;
            state.consolesLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchConsolesAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });


        builder.addCase(fetchAccessTokenAsync.pending, (state) => {
            state.status = 'pendingFetchAccessToken';
        });
        builder.addCase(fetchAccessTokenAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.accessToken = action.payload ?? null;
        });
        builder.addCase(fetchAccessTokenAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });


        builder.addCase(fetchGameCoverAsync.pending, (state) => {
            state.status = 'pendingfetchGameCoverAsync';
        });
        builder.addCase(fetchGameCoverAsync.fulfilled, (state) => {
            // const gameName = action.meta.arg;
            // state.gameCovers[gameName] = action.payload;
            state.status = 'idle';
        });
        builder.addCase(fetchGameCoverAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.error(action.payload);
        });
    })
})

export const gameSelectors = gamesAdapter.getSelectors((state: RootState) => state.catalog);
export const { setGameParams, setMetadata, setPageNumber, setAccessToken, removeProduct } = catalogSlice.actions;