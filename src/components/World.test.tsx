import React from 'react';
import { World } from './World';
import { Cell, Position } from './Cell';

describe('World should', () => {
    it('be empty after initialization', () => {
        const world: World = new World();
        expect(world.getLivingCells()).toHaveLength(0);
    });

    it('should create world with given dimension', () => {
        const dimension: number = 3;
        const world: World = new World(dimension);
        expect(world.getCells()).toHaveLength(dimension * dimension);
    });

    it('should initialize first cell with position', () => {
        const dimension: number = 3;
        const world: World = new World(dimension);
        const firstCell: Cell = world.getCells()[0];
        expect(firstCell.getPosition()).not.toBeNull();
        expect(firstCell.getPosition()).toEqual({x: 0, y:0});
    });

    it('should alive cell', () => {
        const world: World = new World(3);
        world.setAlive({x: 1, y: 1});
        expect(world.getCell(1,1).isAlive).toBeTruthy();
    });

    it('should return living cells', () => {
       const world: World = new World(3);
       world.setAlive({x: 1, y: 1});
       expect(world.getLivingCells()).toHaveLength(1);
       expect(world.getLivingCells()[0].getPosition().x).toBe(1);
       expect(world.getLivingCells()[0].getPosition().y).toBe(1);
    });

    it('has dead cell at (4,4) because no neighbor is alive', () => {
       const world: World = new World(10);
       world.setAlive({x: 4, y: 4});
       world.next();
       expect(world.getCell(4,4).isAlive).toBeFalsy();
    });

    it('has dead cell at (4,4) because only one neighbor is alive', () => {
       const world: World = new World(10);
       world.setAlive({x: 4, y: 4});
       world.setAlive({x: 4, y: 5});
       world.next();
        expect(world.getCell(4,4).isAlive).toBeFalsy();
    });

    it('has still living cell at (4,4) because there is more than living one neighbor', () => {
        const world: World = new World(10);
        world.setAlive({x: 4, y: 4});
        world.setAlive({x: 4, y: 5});
        world.setAlive({x: 4, y: 3});
        world.next();
        expect(world.getCell(4,4).isAlive).toBeTruthy();
    });

    it('have still living cell at (4,4) because there are three living neighbors', () => {
        const world: World = new World(10);
        world.setAlive({x: 4, y: 4});
        world.setAlive({x: 4, y: 5});
        world.setAlive({x: 4, y: 3});
        world.setAlive({x: 3, y: 3});
        world.next();
        expect(world.getLivingCells()).toHaveLength(3);
        expect(world.getCell(4,4).isAlive).toBeTruthy();
    });

    it('have dead cell at (4,4) after having more than three living neighbors', () => {
        const world: World = new World(10);
        world.setAlive({x: 4, y: 4});
        world.setAlive({x: 4, y: 5});
        world.setAlive({x: 4, y: 3});
        world.setAlive({x: 3, y: 3});
        world.setAlive({x: 3, y: 4});
        world.next();
        expect(world.getCell(4,4).isAlive).toBeFalsy();
    });

    it('bring dead cell at (3,5) to live because of two living neighbors', () => {
        const world: World = new World(10);
        world.setAlive({x: 4, y: 4});
        world.setAlive({x: 4, y: 3});
        world.next();
        expect(world.getCell(3,4).isAlive).toBeTruthy();
    });
});