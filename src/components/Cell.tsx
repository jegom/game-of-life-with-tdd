import React from 'react';

export interface Position {
    x: number;
    y: number;
}

export class Cell {
    private readonly position: Position;
    isAlive: boolean;

    constructor(position: Position) {
        this.position = position;
        this.isAlive = false;
    }

    public getPosition = (): Position => {
        return this.position;
    };

    public getNeighborPositions(): Position[] {
        const pos_x: number = this.position.x;
        const pos_y: number = this.position.y;

        return [
            {x: pos_x - 1, y: pos_y - 1},
            {x: pos_x - 1, y: pos_y},
            {x: pos_x - 1, y: pos_y + 1},
            {x: pos_x, y: pos_y - 1},
            {x: pos_x, y: pos_y + 1},
            {x: pos_x + 1, y: pos_y - 1},
            {x: pos_x + 1, y: pos_y},
            {x: pos_x + 1, y: pos_y + 1},
        ];
    }
}