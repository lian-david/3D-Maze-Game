import Maze3D from "./maze3D.js";

/**
 * Abstract class to generate instance of Maze3D
 */
class Maze3DGenerator {
    #rows
    #cols
    #levels

    constructor(levels, rows, cols) {
        if (this.constructor === Maze3DGenerator) {
            throw new Error("Abstract class Maze3DGenerator cannot be instantiated.");
        }
        this.#rows = rows;
        this.#cols = cols;
        this.#levels = levels;
    }

    get rows() {
        return this.#rows;
    }

    get cols() {
        return this.#cols;
    }

    get levels() {
        return this.#levels;
    }

    /**
     * Function to generate maze 
     * @returns instance of Maze3D
     */
    generate() {
        return new Maze3D(this.#levels, this.#rows, this.#cols);
    }

    /**
     * Function to measure algorithm time required to generate maze 
     * @returns elapsed time needed to generate a maze
     */
    measureAlgorithmTime() {
        const start = Date.now();
        this.generate();
        const end = Date.now();
        const totalTime = end - start;
        return `Execution time: ${totalTime} ms`;
    }

    /**
     * Generates random start and end coordinates 
     * @returns object containing random coordinates
     */
    generateRandCoords() {
        let startRow = Math.floor(Math.random() * this.#rows);
        let startCol = Math.floor(Math.random() * this.#cols);
        let endRow = Math.floor(Math.random() * this.#rows);
        let endCol = Math.floor(Math.random() * this.#cols);
        while (startRow === endRow || startCol === endCol) {
            endRow = Math.floor(Math.random() * this.#rows);
            endCol = Math.floor(Math.random() * this.#cols);
        }

        let startLevel = Math.floor(Math.random() * this.#levels);
        let endLevel = Math.floor(Math.random() * this.#levels);

        if (this.#levels > 1) {
            while (startLevel === endLevel || endLevel < startLevel) {
                endLevel = Math.floor(Math.random() * this.#levels);
            }
        }
        
        return {startRow, startCol, endRow, endCol, startLevel, endLevel};
    }
}

export default Maze3DGenerator;