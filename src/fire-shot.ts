import {Coordinate, FireShotInteraction, Game, Player, Row, Ship} from "./types";
import {createGame} from "./create-game";

function shipSunk(shipHit: Ship | undefined, shots: Coordinate[]) {

    if (shipHit) {
        const coordinates = coordinatesOfShip(shipHit);
        console.log(coordinates, shots);
        return coordinates.every(coordinate => shots.some(shot => shot.x === coordinate.x && shot.y === coordinate.y));
    }
    return false;
}

export function fireShot(game: Game, playerFiringTheShot: Player, coordinate: Coordinate): FireShotInteraction {
    const shots = game[playerFiringTheShot].shots;

    const ships = game[otherPlayer(playerFiringTheShot)].ships;

    const shipHit = ships.find(ship => isShipHit(ship, coordinate))
    const isShipSunk = shipSunk(shipHit, [... shots, coordinate]);
    return {
        game: createGame(ships, [...shots, coordinate]),
        successful: false,
        message: 'Not implemented',
        isHit: !!shipHit,
        isGameOver: false,
        isShipSunk
    }
}

function isShipHit(ship: Ship, coordinate: Coordinate): Ship | null {
    const lengthOfCarrier = 4;
    if (ship.orientation === 'horizontal') {
        if (coordinate.y !== ship.frontOfShipCoordinate.y) {
            return null;
        }
        if (coordinate.x >= ship.frontOfShipCoordinate.x && coordinate.x <= ship.frontOfShipCoordinate.x + lengthOfCarrier - 1) {
            return ship;
        }
    }
    if (coordinate.x !== ship.frontOfShipCoordinate.x) {
        return null;
    }
    if (coordinate.y >= ship.frontOfShipCoordinate.y && coordinate.y <= ship.frontOfShipCoordinate.y + lengthOfCarrier - 1) {
        return ship;
    }
    return null;
}

function coordinatesOfShip(ship: Ship): Coordinate[] {
    const lengthOfCarrier = 4;
    if (ship.orientation === 'horizontal') {
        return Array.from({length: lengthOfCarrier}, (_, i) => ({x: ship.frontOfShipCoordinate.x + i, y: ship.frontOfShipCoordinate.y}));
    }
    return Array.from({length: lengthOfCarrier}, (_, i) => ({x: ship.frontOfShipCoordinate.x, y: ship.frontOfShipCoordinate.y + i}));
}

function otherPlayer(player: Player): Player {
    return player === 'playerOne' ? 'playerTwo' : 'playerOne';
}

