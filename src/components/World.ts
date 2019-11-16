import { Cell } from './Cell';
import { Position } from '../types/types';
export class World {
    private cells: Cell[];
    private dimension: number;
    constructor(dimension?: number) {
        this.dimension = dimension;
        this.cells = [];

        for(let i: number = 0; i < dimension; i++) {
            for(let j: number = 0; j< dimension; j++) {
                const position: Position = {x: i, y: j};
                this.cells.push(new Cell(position));
            }
        }
    }

    public getLivingCells(): Cell[] {
        return this.cells.filter(cell => cell.isAlive);
    }

    public getCells(): Cell[] {
        return this.cells;
    }

    public setAlive(position: Position): void {
        this.getCell(position.x, position.y).isAlive = true;
    }

    private killCell(position: Position) {
        this.getCell(position.x, position.y).isAlive = false;
    }

    public getCell(x: number, y: number) {
        return this.cells.find(cell => cell.getPosition().x === x && cell.getPosition().y === y);
    }

    public getCellByPosition(position: Position){
        return this.cells.find(cell => cell.getPosition().x === position.x && cell.getPosition().y === position.y);
    }

    public getCellsByPositions(positions: Position[]){
        const cells: Cell[] = [];
        positions.forEach(position => {
            cells.push(this.getCellByPosition(position));
        });
        return cells;
    }

    public next(): void {
        const nextWorld: World = new World(this.dimension);
        this.getLivingCells().forEach(cell => {
           const livingNeighborCount: number = this.getLivingNeighborCountOf(cell);
           this.isAliveInNextGeneration(livingNeighborCount) ? nextWorld.setAlive(cell.getPosition()) : nextWorld.killCell(cell.getPosition());
           const deadNeighbors: Cell[] = this.getDeadNeighborsOf(cell);
           deadNeighbors.forEach(deadNeighbor => {
               this.canAlive(deadNeighbor) ? nextWorld.setAlive(deadNeighbor.getPosition()) : '';
           })
        });
        this.cells = nextWorld.cells;
    }

    private canAlive(deadNeighbor: Cell) {
        const livingNeighborCount: number = this.getLivingNeighborCountOf(deadNeighbor);
        return livingNeighborCount === 2;
    }

    private getDeadNeighborsOf(cell: Cell) {
        return this.getCellsByPositions(cell.getNeighborPositions()).filter(cell => !cell.isAlive);

    }

    private getLivingNeighborCountOf(cell: Cell): number {
        const neighborCells: Cell[] = this.getCellsByPositions(cell.getNeighborPositions());
        let livingNeighborCounter: number = 0;
        neighborCells.forEach(neighborCell => {
            neighborCell.isAlive ? livingNeighborCounter++ : '';
        });
        return livingNeighborCounter;
    }

    private isAliveInNextGeneration(livingNeighborCounter: number) {
        return livingNeighborCounter > 1 && livingNeighborCounter < 4;
    }

}