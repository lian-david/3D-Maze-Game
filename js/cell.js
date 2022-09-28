/**
 * Class used to represent cell of maze matrix 
 */
class Cell {
    constructor(location) {
        this.location = location;
        this.values = {
            left: false,
            right: false,
            forward: false,
            back: false,
            up: false,
            down: false,
            start: false,
            end: false
        };
    }
}

export default Cell;