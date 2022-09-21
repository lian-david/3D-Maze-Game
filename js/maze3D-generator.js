import Maze3D from "./maze3D.js";

/**
 * Abstract class to generate instance of Maze3D
 */
class Maze3DGenerator {
    #rows
    #cols

    constructor(rows, cols) {
        if (this.constructor === Maze3DGenerator) {
            throw new Error("Abstract class Maze3DGenerator cannot be instantiated.");
        }
        this.#rows = rows;
        this.#cols = cols;
    }

    /**
     * Function to generate maze 
     * @returns instance of Maze3D
     */
    generate() {
        return new Maze3D(this.#rows, this.#cols);
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
}

export default Maze3DGenerator;