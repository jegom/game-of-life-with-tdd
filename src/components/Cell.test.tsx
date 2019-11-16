import React from 'react';
import { World } from './World';
import { Cell, Position } from './Cell';

describe('Cell should', () => {
    it('have eight neighbors', ()=> {
        const position: Position = {x: 1, y: 1};
        const cell: Cell = new Cell(position);
        expect(cell.getNeighborPositions()).toHaveLength(8);
    });

    it('cell at position (1,1) should return correct positions of neighbors', () => {
        const position: Position = {x: 1, y: 1};
        const cell: Cell = new Cell(position);
        const expectedNeighborPositions: Position[] = [
            {x: 0, y: 0},
            {x: 0, y: 1},
            {x: 0, y: 2},
            {x: 1, y: 0},
            {x: 1, y: 2},
            {x: 2, y: 0},
            {x: 2, y: 1},
            {x: 2, y: 2}
        ];
        const neighborPositions: Position[] = cell.getNeighborPositions();
        //TODO: code smell!
        expect(neighborPositions.toString()).toContain(expectedNeighborPositions.toString());
    });
});