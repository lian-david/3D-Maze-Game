import Maze3DGenerator from "./maze3D-generator.js";

/**
 * Subclass of Maze3DGenerator to generate maze using Prim's algorithm
 */
class PrimsMaze3DGenerator extends Maze3DGenerator {
    constructor(levels, rows, cols) {
        super(levels, rows, cols);
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
        maze.start = [coords.startLevel, coords.startRow, coords.startCol];
        maze.end = [coords.endLevel, coords.endRow, coords.endCol];
        
        for (const level of maze.levels) {
            for (let x = 0; x < level.grid.length; x++) {
                for (let y = 0; y < level.grid[x].length; y++) {
                    if (y === 0) {
                        level.grid[x][y].values.left = true;
                    }
                    if (y === this.cols - 1) {
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
                    if (x === this.rows - 1) {
                        level.grid[x][y].values.back = true;
                    }
                }
            }
        }
        
        if (coords.endRow < this.rows - 1) {
            maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.back = false;
            maze.levels[coords.endLevel].grid[coords.endRow + 1][coords.endCol].values.forward = false;
            if (coords.endCol < this.cols - 1) {
                maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.right = false;
                maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol + 1].values.left = false;
            } else {
                maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.left = false;
            }
        } else {
            maze.levels[coords.endLevel].grid[coords.endRow - 1][coords.endCol].values.back = false;
            maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.forward = false;
            if (coords.endCol < this.cols - 1) {
                maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.right = false;
                maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol + 1].values.left = false;
            } else {
                maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.left = false;
            }
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
            if (cell[2] !== 0) {
                maze.levels[cell[0]].grid[cell[1]][cell[2]].values.left = false;
                maze.levels[cell[0]].grid[cell[1]][cell[2] - 1].values.right = false;
            }
            if (cell[1] < this.rows - 1) {
                maze.levels[cell[0]].grid[cell[1]][cell[2]].values.back = false;
                maze.levels[cell[0]].grid[cell[1] + 1][cell[2]].values.forward = false;
            }
            if (cell[0] + 1 < this.levels && maze.levels[cell[0] + 1].grid[cell[1]][cell[2]].values.start !== true
                && maze.levels[cell[0] + 1].grid[cell[1]][cell[2]].values.end !== true) {
                    maze.levels[cell[0] + 1].grid[cell[1]][cell[2]].values.down = true;
                }
            if (cell[0] - 1 < this.levels && cell[0] - 1 >= 0 && maze.levels[cell[0] - 1].grid[cell[1]][cell[2]].values.start !== true
                && maze.levels[cell[0] - 1].grid[cell[1]][cell[2]].values.end !== true) {
                    maze.levels[cell[0] - 1].grid[cell[1]][cell[2]].values.up = true;
                }

            cellsInMaze.push(wall);
            wallList = [];
            for (let i = 0; i < cellsInMaze.length; i++) {
                let c = cellsInMaze[i];
                let neighbors = [[c[0], c[1] + 1, c[2]], [c[0], c[1] - 1, c[2]], [c[0], c[1], c[2] + 1], [c[0], c[1], c[2] - 1], 
                [c[0] + 1, c[1], c[2]], [c[0] - 1, c[1], c[2]]].filter(cell => (cell[0] >= 0 && cell[0] < this.levels && 
                    cell[1] >= 0 && cell[1] < this.rows && cell[2] > 0 && cell[2] < this.cols));
                let validCells = neighbors.filter(cell => (!cellsInMaze.some(c => (cell[0] === c[0] && cell[1] === c[1] && cell[2] === c[2]))
                && !wallList.some(c => (cell[0] === c[0] && cell[1] === c[1] && cell[2] === c[2]))));
                wallList = wallList.concat(validCells);
            }
        }
        return maze;
    }
}

export default PrimsMaze3DGenerator;