/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
        VITE_TWITCH_CLIENT_ID: string;
        VITE_TWITCH_CLIENT_SECRET: string;
    }
}