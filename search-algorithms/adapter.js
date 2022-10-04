import Searchable from "./searchable.js";

/**
 * Adapts an instance of Maze3D into a search problem
 */
class Maze3DAdapter extends Searchable{
    constructor(problem) {
        super(problem);
    }
    
    /**
     * Returns possible state transitions from given state
     * @param {Array} state 
     * @returns possible state transitions
     */
     getStateTransitions(state) {
        let neighbors = [];

        if (this.problem.levels[state[0]].grid[state[1]][state[2]].values.left === false) {
            neighbors.push([state[0], state[1], state[2] - 1]);
        }

        if (this.problem.levels[state[0]].grid[state[1]][state[2]].values.right === false) {
            neighbors.push([state[0], state[1], state[2] + 1]);
        }

        if (this.problem.levels[state[0]].grid[state[1]][state[2]].values.forward === false) {
            neighbors.push([state[0], state[1] - 1, state[2]]);
        }

        if (this.problem.levels[state[0]].grid[state[1]][state[2]].values.back === false) {
            neighbors.push([state[0], state[1] + 1, state[2]]);
        }

        if (this.problem.levels[state[0]].grid[state[1]][state[2]].values.up === true) {
            neighbors.push([state[0] + 1, state[1], state[2]]);
        }

        if (this.problem.levels[state[0]].grid[state[1]][state[2]].values.down === true) {
            neighbors.push([state[0] - 1, state[1], state[2]]);
        }

        let transitions = neighbors.filter(n => (n[0] >= 0 && n[0] < this.problem.levels.length && n[1] >= 0 && n[1] < this.problem.rows
            && n[2] >= 0 && n[2] < this.problem.cols));
            
        return transitions;
    }
}

export default Maze3DAdapter;