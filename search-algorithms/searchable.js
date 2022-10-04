/**
 * Abstract class to represent any search problem
 */

class Searchable {
    #problem
    #startState
    #goalState

    constructor (problem) {
        if (this.constructor === Searchable) {
            throw new Error("Abstract class Searchable cannot be instantiated.");
        }
        this.#problem = problem;
        this.#startState = problem.start;
        this.#goalState = problem.end;
    }

    get startState() {
        return this.#startState;
    }

    get goalState() {
        return this.#goalState;
    }

    get problem() {
        return this.#problem;
    }

    /**
     * Returns possible state transitions from given state
     * @param {Array} state 
     * @returns possible state transitions
     */
    getStateTransitions(state) {
        throw new Error("Method getStateTransitions() must be implemented");
    }
}

export default Searchable;