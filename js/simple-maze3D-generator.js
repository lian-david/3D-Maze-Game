import Maze3DGenerator from "./maze3D-generator.js";

/**
 * Subclass of Maze3DGenerator to randomly generate maze
 */
class SimpleMaze3DGenerator extends Maze3DGenerator {
    #rows
    #cols

    constructor(rows, cols) {
        super(rows, cols);
        this.#rows = rows;
        this.#cols = cols;
    }

    generateMaze() {
        const maze = super.generate();
        const coords = this.generateRandCoords()
        maze.levels[0].grid[coords.startRow].splice(coords.startCol, 1, "S");        
        maze.levels[2].grid[coords.endRow].splice(coords.endCol, 1, "E");
        const start = [coords.startRow, coords.startCol];
        let path = [];

        for (const level of maze.levels) {

        }

        return maze.toString();
    }

    generateRandCoords() {
        const startRow = Math.floor(Math.random() * this.#rows);
        const startCol = Math.floor(Math.random() * this.#cols);
        let endRow = Math.floor(Math.random() * this.#rows);
        let endCol = Math.floor(Math.random() * this.#cols);
        while (startRow === endRow || startCol === endCol) {
            endRow = Math.floor(Math.random() * this.#rows);
            endCol = Math.floor(Math.random() * this.#cols);
        }

        return {startRow, startCol, endRow, endCol};
    }
}

export default SimpleMaze3DGenerator;