import Maze3DGenerator from "./maze3D-generator.js";

/**
 * Subclass of Maze3DGenerator to generate maze using Depth First Search 
 */
class DFSMaze3DGenerator extends Maze3DGenerator {
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

        let stack = [[coords.startLevel, coords.startRow, coords.startCol]];
        let visited = [[coords.startLevel, coords.startRow, coords.startCol]];
        let currCell = [coords.startLevel, coords.startRow, coords.startCol];
        
        while (stack.length) {
            let neighbors = [[currCell[0], currCell[1] + 1, currCell[2]], [currCell[0], currCell[1] - 1, currCell[2]],
                [currCell[0], currCell[1], currCell[2] + 1], [currCell[0], currCell[1], currCell[2] - 1],
                [currCell[0] + 1, currCell[1], currCell[2]], [currCell[0] - 1, currCell[1], currCell[2]]];
            
            let notVisited = neighbors.filter(n => (n[0] >= 0 && n[0] < this.levels && n[1] >= 0 && n[1] < this.#rows
                && n[2] > 0 && n[2] < this.#cols && !visited.includes(n)));
            
            if (notVisited.length) {
                stack.push(currCell);
                let n = notVisited[Math.floor(Math.random() * notVisited.length)];
                maze.levels[n[0]].grid[n[1]][n[2]].values.left = false;
                maze.levels[n[0]].grid[n[1]][n[2] - 1].values.right = false;
                if (n[1] <= this.#rows - 2) {
                    maze.levels[n[0]].grid[n[1]][n[2]].values.back = false;
                    maze.levels[n[0]].grid[n[1] + 1][n[2]].values.forward = false;
                }
                visited.push(n);
                stack.push(n);
                currCell = n;
            } else {
                currCell = stack.pop();
            }
        }
        return maze;
    }
}

export default DFSMaze3DGenerator;