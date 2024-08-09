/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store: any = configureStore({
    reducer: {
        catalog: catalogSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;