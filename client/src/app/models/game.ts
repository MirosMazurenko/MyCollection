export interface Game {
    id: number;
    name: string;
    consoleName: string;
    loosePrice: number;
    completePrice: number;
    newPrice: number;
}


export interface GameParams {
    orderBy: string;
    searchTerm?: string;
    consoles: string[];
    pageNumber: number;
    pageSize: number;
}