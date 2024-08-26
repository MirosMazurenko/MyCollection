export interface GameCollection {
    id: number
    userId: string
    items: CollectionItem[]
}

export interface CollectionItem {
    gameId: number
    name: string
    gameCondition: string
    consoleName: string
    loosePrice: number
    completePrice: number
    newPrice: number
    date: Date
}