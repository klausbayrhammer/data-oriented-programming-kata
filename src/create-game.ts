import {Coordinate, Game, Ship} from "./types";

export function createGame(shipsPlayerOne: Ship[] = [], shotsPlayerTwo : Coordinate[] = []): Game {
    return {
        playerOne: {
            shots: [],
            ships: shipsPlayerOne
        },
        playerTwo: {
            shots: shotsPlayerTwo,
            ships: []
        }
    }
}
