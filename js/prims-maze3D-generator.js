import Maze3DGenerator from "./maze3D-generator.js";

/**
 * Subclass of Maze3DGenerator to generate maze using Prim's algorithm
 */
class PrimsMaze3DGenerator extends Maze3DGenerator {
    #rows
    #cols

    constructor(levels, rows, cols) {
        super(levels, rows, cols);
        this.#rows = rows;
        this.#cols = cols;
        this.levels = levels;
    }

    /**
     * Generates maze 
     * @returns instance of Maze3D
     */
    generate() {
        const maze = super.generate();
        const coords = super.generateRandCoords();
        maze.levels[coords.startLevel].grid[coords.startRow][coords.startCol].values.start = true;
        maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.end = true;
        let numLevel = 0;
        
        for (const level of maze.levels) {
            for (let x = 0; x < level.grid.length; x++) {
                for (let y = 0; y < level.grid[x].length; y++) {
                    let r = super.getRandInt();
                    let r2 = super.getRandInt();
                    if (y === 0) {
                        level.grid[x][y].values.left = true;
                    }
                    if (y === this.#cols - 1) {
                        level.grid[x][y].values.right = true;
                    }
                    if (y !== 0) {
                        level.grid[x][y].values.left = true;
                        level.grid[x][y - 1].values.right = true;
                    }
                    if (x + 1 < level.grid.length) {
                        level.grid[x][y].values.back = true;
                        level.grid[x + 1][y].values.forward = true;
                    }
                    if (x === 0) {
                        level.grid[x][y].values.forward = true;
                    }
                    if (x === this.#rows - 1) {
                        level.grid[x][y].values.back = true;
                    }
                    if (numLevel + 1 <= this.levels - 1 && level.grid[x][r].values.start !== true
                        && level.grid[x][r].values.end !== true) {
                        level.grid[x][r].values.up = true;
                    }
                    if (numLevel - 1 <= this.levels - 1 && level.grid[x][r2].values.start !== true 
                        && level.grid[x][r2].values.end !== true && numLevel - 1 >= 0) {
                        level.grid[x][r2].values.down = true;
                    }
                }
            }
            numLevel ++;
        }

        let cellsInMaze = [[coords.startLevel, coords.startRow, coords.startCol]];
        let wallList = [[coords.startLevel, coords.startRow + 1, coords.startCol], [coords.startLevel, coords.startRow, coords.startCol + 1]];
        
        while (wallList.length) {
            let wall = wallList[Math.floor(Math.random() * wallList.length)];
            let wallNeighbors = [[wall[0], wall[1] + 1, wall[2]], [wall[0], wall[1] - 1, wall[2]],
                [wall[0], wall[1], wall[2] + 1], [wall[0], wall[1], wall[2] - 1],
                [wall[0] + 1, wall[1], wall[2]], [wall[0] - 1, wall[1], wall[2]]];
                    
            let validNeighbors = wallNeighbors.filter(cell => (cellsInMaze.some(c => (cell[0] === c[0] && cell[1] === c[1] && cell[2] === c[2]))));
            let cell = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
            maze.levels[cell[0]].grid[cell[1]][cell[2]].values.left = false;
            maze.levels[cell[0]].grid[cell[1]][cell[2] - 1].values.right = false;
            if (cell[1] <= this.#rows - 2) {
                maze.levels[cell[0]].grid[cell[1]][cell[2]].values.back = false;
                maze.levels[cell[0]].grid[cell[1] + 1][cell[2]].values.forward = false;
            }

            cellsInMaze.push(wall);
            wallList = [];
            for (let i = 0; i < cellsInMaze.length; i++) {
                let c = cellsInMaze[i];
                let neighbors = [[c[0], c[1] + 1, c[2]], [c[0], c[1] - 1, c[2]], [c[0], c[1], c[2] + 1], [c[0], c[1], c[2] - 1], 
                [c[0] + 1, c[1], c[2]], [c[0] - 1, c[1], c[2]]].filter(cell => (cell[0] >= 0 && cell[0] < this.levels && 
                    cell[1] >= 0 && cell[1] < this.#rows && cell[2] > 0 && cell[2] < this.#cols));
                let validCells = neighbors.filter(cell => (!cellsInMaze.some(c => (cell[0] === c[0] && cell[1] === c[1] && cell[2] === c[2]))
                && !wallList.some(c => (cell[0] === c[0] && cell[1] === c[1] && cell[2] === c[2]))));
                wallList = wallList.concat(validCells);
            }
        }
        return maze;
    }
}

export default PrimsMaze3DGenerator;