import SearchAlgorithm from "./search-algorithm.js";
import Searchable from "./searchable.js";

/**
 * Breadth First Search search algorithm
 */
class BreadthFirstSearch extends SearchAlgorithm {
    /**
     * Returns solution to search problem
     * @param {Searchable} searchable 
     */
    search(searchable) {
        let initialNode = {state: searchable.startState, path: [searchable.startState]};
        let frontier = [initialNode];
        let visited = [];

        while (frontier.length) {
            let currNode = frontier.pop();
            visited.push(currNode.state);
            
            let neighbors = searchable.getStateTransitions(currNode.state);
            let notVisited = neighbors.filter(n => (!frontier.some(f => (f.state[0] === n[0] && f.state[1] === n[1]
                && f.state[2] === n[2])) && !visited.some(v => (v[0] === n[0] && v[1] === n[1] && v[2] === n[2]))));

            for (const n of notVisited) {
                let childNode = {state: n, path: currNode.path.concat([n])};
                if (childNode.state[0] === searchable.goalState[0] && childNode.state[1] === searchable.goalState[1] 
                    && childNode.state[2] === searchable.goalState[2]) {
                    visited.push(n);
                    this.nodes = visited.length;
                    return childNode.path;
                }
                frontier.push(childNode);
            }
        }
        return false;
    }
}

export default BreadthFirstSearch;