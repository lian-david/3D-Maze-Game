/**
 * Class used to represent cell of maze matrix 
 */
class Cell {
    #location
    #values

    constructor(location) {
        this.#location = location;
        this.#values = this.generateWallValues();
    }
    
    /**
     * Function to instantiate values determining whether the cell is surrounded by a wall
     * @returns Map object of values indicating whether the cell has a wall to either of its sides
     */
    generateWallValues() {
        let wallValues = new Map();
        wallValues.set("left", false);
        wallValues.set("right", false);
        wallValues.set("forward", false);
        wallValues.set("backward", false);
        wallValues.set("up", false);
        wallValues.set("down", false);

        return wallValues;
    }
}

export default Cell;