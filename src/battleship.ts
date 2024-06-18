import {Game, Player, PlayerInteraction, Ship} from "./types";
import {createGame} from "./create-game";

export function placeShip(game: Game, ship: Ship, player: Player): PlayerInteraction {
    const gameWithShipAdded = createGame([... game[player].ships, ship]);
    return {
        game: gameWithShipAdded,
        successful: true,
        message: 'Ship placed successfully'
    }
}

function printBoard(player: Player, game: Game): string {
    throw new Error('Not implemented');
}
