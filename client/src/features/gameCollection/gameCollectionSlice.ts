/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { GameCollection } from "../../app/models/gameCollection";
import agent from "../../app/api/agent";

interface GameCollectionState {
    gameCollection: GameCollection | null;
    status: string;
}

const initialState: GameCollectionState = {
    gameCollection: null,
    status: 'idle'
}

export const fetchGameCollectionAsync = createAsyncThunk<GameCollection>(
    'gameCollection/fetchGameCollectionAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.GameCollection.getGameCollection();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const addGameCollectionItemAsync = createAsyncThunk<GameCollection, { gameId: number, gameCondition: string }>(
    'gameCollection/addGameCollectionItemAsync',
    async ({ gameId, gameCondition }, thunkAPI) => {
        try {
            return await agent.GameCollection.addItem(gameId, gameCondition);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const removeGameCollectionItemAsync = createAsyncThunk<GameCollection, { gameId: number, gameCondition: string }>(
    'gameCollection/removeGameCollectionItemAsync',
    async ({ gameId, gameCondition }, thunkAPI) => {
        try {
            return await agent.GameCollection.removeItem(gameId, gameCondition);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const gameCollectionSlice = createSlice({
    name: 'gameCollection',
    initialState,
    reducers: {
        setGameCollection: (state, action) => {
            state.gameCollection = action.payload;
        },
        clearGameCollection: (state) => {
            state.gameCollection = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(addGameCollectionItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.gameId;
        });
        builder.addCase(removeGameCollectionItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.gameId + action.meta.arg.gameCondition;
        })
        builder.addCase(removeGameCollectionItemAsync.fulfilled, (state, action) => {
            const { gameId, gameCondition } = action.meta.arg;
            if (!state.gameCollection?.items) return;

            const itemIndex = state.gameCollection.items.findIndex(i => i.gameId === gameId);
            if (itemIndex === -1) return;

            if (state.gameCollection.items[itemIndex].gameCondition === gameCondition) {
                state.gameCollection.items.splice(itemIndex, 1);
            }
            state.status = 'idle';
        });
        builder.addCase(removeGameCollectionItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
        builder.addMatcher(isAnyOf(addGameCollectionItemAsync.fulfilled, fetchGameCollectionAsync.fulfilled), (state, action) => {
            state.gameCollection = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addGameCollectionItemAsync.rejected, fetchGameCollectionAsync.rejected), (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    }
})

export const { setGameCollection, clearGameCollection } = gameCollectionSlice.actions;