import { test, expect} from 'vitest';
import {placeShip} from "./battleship";
import {fireShot} from "./fire-shot";
import {createGame} from "./create-game";

test('should fire a shot not hitting the boat', () => {
    const initialGame = createGame();
    const {game} = placeShip(initialGame, {type: 'carrier', orientation: 'horizontal', frontOfShipCoordinate: {x: 1, y: 1}}, 'playerOne');
    const interaction = fireShot(game, 'playerTwo', {x: 0, y:0});
    expect(interaction).toMatchObject({
        isHit: false,
    });
});

test('should fire a shot hitting the front of the boat', () => {
    const initialGame = createGame();
    const {game} = placeShip(initialGame, {type: 'carrier', orientation: 'horizontal', frontOfShipCoordinate: {x: 1, y: 1}}, 'playerOne');
    const interaction = fireShot(game, 'playerTwo', {x: 1, y:1});
    expect(interaction).toMatchObject({
        isHit: true,
    });
    expect(interaction.game.playerTwo.shots).toHaveLength(1);
});

test('should fire a shot hitting the back of the boat', () => {
    const initialGame = createGame();
    const {game} = placeShip(initialGame, {type: 'carrier', orientation: 'horizontal', frontOfShipCoordinate: {x: 1, y: 1}}, 'playerOne');
    const interaction = fireShot(game, 'playerTwo', {x: 4, y:1});
    expect(interaction).toMatchObject({
        isHit: true,
    });
    expect(interaction.game.playerTwo.shots).toHaveLength(1);
});

test('should fire a shot hitting the back of the boat with vertical orientation', () => {
    const initialGame = createGame();
    const {game} = placeShip(initialGame, {type: 'carrier', orientation: 'vertical', frontOfShipCoordinate: {x: 1, y: 1}}, 'playerOne');
    const interaction = fireShot(game, 'playerTwo', {x: 1, y:4});
    expect(interaction).toMatchObject({
        isHit: true,
    });
    expect(interaction.game.playerTwo.shots).toHaveLength(1);
});

test('should fire a shot hitting the back of the boat with vertical orientation', () => {
    const game = createGame([{type: 'carrier', orientation: 'vertical', frontOfShipCoordinate: {x: 1, y: 1}}], [{x: 1, y:1}, {x: 1, y:2}, {x: 1, y:3}]);
    const interaction = fireShot(game, 'playerTwo', {x: 1, y:4});
    expect(interaction).toMatchObject({
        isShipSunk: true,
    });
});


