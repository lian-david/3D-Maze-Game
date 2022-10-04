import Maze3DGenerator from "./maze3D-generator.js";

/**
 * Subclass of Maze3DGenerator to randomly generate maze
 */
class SimpleMaze3DGenerator extends Maze3DGenerator {
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
        let numLevel = 0;
        
        for (const level of maze.levels) {
            for (let x = 0; x < level.grid.length; x++) {
                for (let y = 0; y < level.grid[x].length; y++) {
                    let r = this.getRandInt();
                    let r2 = this.getRandInt();
                    let r3 = this.getRandInt();
                    let r4 = this.getRandInt();
                    let r5 = this.getRandInt();
                    let r6 = this.getRandInt();
                    if (x === 0) {
                        level.grid[x][y].values.forward = true;
                    }
                    if (x === this.rows - 1) {
                        level.grid[x][y].values.back = true;
                    }
                    if (y === 0) {
                        level.grid[x][y].values.left = true;
                    }
                    if (y === this.cols - 1) {
                        level.grid[x][y].values.right = true;
                    }
                    if (y === r && y !== this.cols - 1 && y !== 0) {
                        level.grid[x][y].values.left = true;
                        level.grid[x][y - 1].values.right = true;
                    }
                    if (y === r2 && y !== this.cols - 1 && y !== 0) {
                        level.grid[x][y].values.left = true;
                        level.grid[x][y - 1].values.right = true;
                    }  
                    if (y === r3 && y !== this.cols - 1 && y !== 0) {
                        level.grid[x][y].values.left = true;
                        level.grid[x][y - 1].values.right = true;
                    }
                    if (y === r4 && x + 1 < level.grid.length && level.grid[x][y].values.start !== true
                        && level.grid[x][y].values.end !== true) {
                        level.grid[x][y].values.back = true;
                        level.grid[x + 1][y].values.forward = true;
                    }
                    if (y === r5 &&  x + 1 < level.grid.length && level.grid[x][y].values.start !== true
                        && level.grid[x][y].values.end !== true) {
                        level.grid[x][y].values.back = true;
                        level.grid[x + 1][y].values.forward = true;
                    } 
                    if (y === r6 && x + 1 < level.grid.length && level.grid[x][y].values.start !== true
                        && level.grid[x][y].values.end !== true) {
                        level.grid[x][y].values.back = true;
                        level.grid[x + 1][y].values.forward = true;
                    }
                    if (numLevel + 1 < this.levels && maze.levels[numLevel + 1].grid[x][y].values.start !== true
                        && maze.levels[numLevel + 1].grid[x][y].values.end !== true && (level.grid[x][y].values.back === false
                        || level.grid[x][y].values.left === false)) {
                            maze.levels[numLevel + 1].grid[x][y].values.down = true;
                    }
                    
                }
            }
            numLevel++;
        }

        if (coords.startRow < this.rows - 1) {
            maze.levels[coords.startLevel].grid[coords.startRow][coords.startCol].values.back = false;
            maze.levels[coords.startLevel].grid[coords.startRow + 1][coords.startCol].values.forward = false;
            if (coords.startCol < this.cols - 1) {
                maze.levels[coords.startLevel].grid[coords.startRow][coords.startCol].values.right = false;
                maze.levels[coords.startLevel].grid[coords.startRow][coords.startCol + 1].values.left = false;
            }
        } else {
            maze.levels[coords.startLevel].grid[coords.startRow - 1][coords.startCol].values.back = false;
            maze.levels[coords.startLevel].grid[coords.startRow][coords.startCol].values.forward = false;
            if (coords.startCol < this.cols - 1) {
                maze.levels[coords.startLevel].grid[coords.startRow][coords.startCol].values.right = false;
                maze.levels[coords.startLevel].grid[coords.startRow][coords.startCol + 1].values.left = false;
            }
        }

        if (coords.endRow < this.rows - 1) {
            maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.back = false;
            maze.levels[coords.endLevel].grid[coords.endRow + 1][coords.endCol].values.forward = false;
            if (coords.endCol < this.cols - 1) {
                maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.right = false;
                maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol + 1].values.left = false;
            }
        } else {
            maze.levels[coords.endLevel].grid[coords.endRow - 1][coords.endCol].values.back = false;
            maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.forward = false;
            if (coords.endCol < this.cols - 1) {
                maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.right = false;
                maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol + 1].values.left = false;
            }
        }

        let numLevels = 0;
        for (const level of maze.levels) {
            for (let x = 0; x < level.grid.length; x++) {
                for (let y = 0; y < level.grid[x].length; y++) {
                    if (numLevels + 1 < this.levels && level.grid[x][y].values.start !== true
                        && level.grid[x][y].values.end !== true && (maze.levels[numLevels + 1].grid[x][y].values.back === false 
                        || maze.levels[numLevels + 1].grid[x][y].values.left === false)) {
                            level.grid[x][y].values.up = true;
                    }
                }
            }
            numLevels++;
        }

        return maze;
    }

    /**
     * Generates random integer for wall placement 
     * @returns random integer 
     */
    getRandInt() {
        return Math.floor(Math.random() * this.cols);
    }
}

export default SimpleMaze3DGenerator;