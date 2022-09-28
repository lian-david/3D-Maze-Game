import Maze3DGenerator from "./maze3D-generator.js";

/**
 * Subclass of Maze3DGenerator to randomly generate maze
 */
class SimpleMaze3DGenerator extends Maze3DGenerator {
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
                    let r3 = super.getRandInt();
                    let r4 = super.getRandInt();
                    let r5 = super.getRandInt();
                    let r6 = super.getRandInt();
                    if (x === 0) {
                        level.grid[x][y].values.forward = true;
                    }
                    if (x === this.#rows - 1) {
                        level.grid[x][y].values.back = true;
                    }
                    if (y === 0) {
                        level.grid[x][y].values.left = true;
                    }
                    if (y === this.#cols - 1) {
                        level.grid[x][y].values.right = true;
                    }
                    if (y === r && y !== this.#cols - 1 && y !== 0) {
                        level.grid[x][y].values.left = true;
                        level.grid[x][y - 1].values.right = true;
                    }
                    if (y === r2 && y !== this.#cols - 1 && y !== 0) {
                        level.grid[x][y].values.left = true;
                        level.grid[x][y - 1].values.right = true;
                    }  
                    if (y === r3 && y !== this.#cols - 1 && y !== 0) {
                        level.grid[x][y].values.left = true;
                        level.grid[x][y - 1].values.right = true;
                    }
                    if (y === r4 && y !== this.#cols - 1 && x + 1 < level.grid.length) {
                        level.grid[x][y].values.back = true;
                        level.grid[x + 1][y].values.forward = true;
                    }
                    if (y === r5 && y !== this.#cols - 1 && x + 1 < level.grid.length) {
                        level.grid[x][y].values.back = true;
                        level.grid[x + 1][y].values.forward = true;
                    } 
                    if (y === r6 && y !== this.#cols - 1 && x + 1 < level.grid.length) {
                        level.grid[x][y].values.back = true;
                        level.grid[x + 1][y].values.forward = true;
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
        return maze;
    }
}

export default SimpleMaze3DGenerator;