import { Game } from "./game";

export interface User {
    email: string;
    token: string;
    username: string;
    gameCollection?: Game;
    roles?: string[];
}