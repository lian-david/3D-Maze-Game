import SearchAlgorithm from "./search-algorithm.js";
import Searchable from "./searchable.js";

/**
 * A* search algorithm
 */
class AStar extends SearchAlgorithm {
    /**
     * Returns solution to search problem
     * @param {Searchable} searchable 
     */
    search(searchable) {
        let initialNode = {state: searchable.startState, path: [searchable.startState], cost: 0};
        let frontier = [initialNode];
        let visited = [];

        while (frontier.length) {
            let lowestIdx = 0;
            for (let i = 0; i < frontier.length; i++) {
                if (frontier[i].cost < frontier[lowestIdx].cost) {
                    lowestIdx = i;
                }
            }

            let currNode = frontier[lowestIdx];
            frontier.splice(lowestIdx, 1);
            visited.push(currNode.state);

            if (currNode.state[0] === searchable.goalState[0] && currNode.state[1] === searchable.goalState[1] 
                && currNode.state[2] === searchable.goalState[2]) {
                this.nodes = visited.length;
                return currNode.path;
            }

            let neighbors = searchable.getStateTransitions(currNode.state);
            let notVisited = neighbors.filter(n => (!visited.some(v => (v[0] === n[0] && v[1] === n[1] && v[2] === n[2]))));

            for (const nextState of notVisited) {
                let stepCost = currNode.cost + 1;
                let nextCost = this.heuristic(nextState, searchable.goalState);
                let nextNode = {state: nextState, path: currNode.path.concat([nextState]), cost: nextCost + stepCost};

                let inFrontier = frontier.find(f => (f.state[0] === nextState[0] && f.state[1] === nextState[1] && f.state[2] === nextState[2]));
                if (!inFrontier) {
                    frontier.push(nextNode);
                } else if (inFrontier.cost >= stepCost + nextCost) {
                    let nodeIdx = frontier.indexOf(inFrontier);
                    frontier.splice(nodeIdx, 1, nextNode);
                }
            }
        }
        return false;
    }

    /**
     * Calculates Manhattan distance between coordinates
     * @param {Array} pos0 
     * @param {Array} pos1 
     */
    heuristic(pos0, pos1) {
        let dist1 = Math.abs(pos1[0] - pos0[0]);
        let dist2 = Math.abs(pos1[1] - pos0[1]);
        let dist3 = Math.abs(pos1[2] - pos0[2]);

        return dist1 + dist2 + dist3;
    }
}

export default AStar;