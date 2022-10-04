/**
 * Abstract class to represent any search algorithm
 */

class SearchAlgorithm {
    constructor() {
        if (this.constructor === SearchAlgorithm) {
            throw new Error("Abstract class SearchAlgorithm cannot be instantiated.");
        }
    }

    /**
     * Returns solution to search problem
     * @param {Searchable} searchable 
     */
    search(searchable) {
        throw new Error("Method search() must be implemented");
    }

    /**
     * Returns nodes evaluated to reach solution
     */
    getNumberOfNodesEvaluated() {
        return this.nodes;
    }
}

export default SearchAlgorithm;