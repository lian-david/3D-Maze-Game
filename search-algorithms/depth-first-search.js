import SearchAlgorithm from "./search-algorithm.js"
import Searchable from "./searchable.js";

/**
 * Depth First Search algorithm
 */
class DepthFirstSearch extends SearchAlgorithm {
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
           
            if (currNode.state[0] === searchable.goalState[0] && currNode.state[1] === searchable.goalState[1] 
                && currNode.state[2] === searchable.goalState[2]) {
                this.nodes = visited.length;
                return currNode.path;
            }

            let neighbors = searchable.getStateTransitions(currNode.state);
            let notVisited = neighbors.filter(n => (!frontier.some(f => (f.state[0] === n[0] && f.state[1] === n[1] 
                && f.state[2] === n[2])) && !visited.some(v => (v[0] === n[0] && v[1] === n[1] && v[2] === n[2]))));
            
            for (const n of notVisited) {
                frontier.push({state: n, path: currNode.path.concat([n])});
            }
        }
        return false;
    }
}

export default DepthFirstSearch;