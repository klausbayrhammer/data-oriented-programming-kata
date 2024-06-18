export type Game = {
    readonly playerOne: {
        readonly shots: Coordinate[];
        readonly ships: Ship[];

    };
    readonly playerTwo: {
        readonly shots: Coordinate[];
        readonly ships: Ship[];
    };
}

export type Player = keyof Game;

export type Column = number;
export type Row = number;

export type Coordinate = {
    readonly x: Column;
    readonly y: Row;
}

type ShipType = 'carrier' | 'destroyer' | 'gunship';
export type Ship = {
    readonly type: ShipType;
    readonly orientation: 'horizontal' | 'vertical';
    readonly frontOfShipCoordinate: Coordinate;
}

export type PlayerInteraction = {
    readonly game: Game;
    readonly successful: boolean;
    readonly message: string;
}

export type FireShotInteraction = PlayerInteraction & {
    readonly isHit: boolean;
    readonly isGameOver: boolean
    readonly isShipSunk: boolean;
}
