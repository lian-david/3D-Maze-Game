import Maze3D from "../js/maze3D.js";
import Maze3DGenerator from "../js/maze3D-generator.js";
import SimpleMaze3DGenerator from "../js/simple-maze3D-generator.js";
import PrimsMaze3DGenerator from "../js/prims-maze3D-generator.js";
import DFSMaze3DGenerator from "../js/dfs-maze3D-generator.js";

test(".toBeInstanceOf", () => {
    const simpleGen = new SimpleMaze3DGenerator(3, 5, 5);
    const simpleMaze = simpleGen.generate();
    expect(simpleMaze).toBeInstanceOf(Maze3D);
});

test(".toBeInstanceOf", () => {
    const dfsGen = new DFSMaze3DGenerator(3, 5, 5);
    const dfsMaze = dfsGen.generate();
    expect(dfsMaze).toBeInstanceOf(Maze3D);
});

test(".toBeInstanceOf", () => {
    const primsGen = new PrimsMaze3DGenerator(3, 5, 5);
    const primsMaze = primsGen.generate();
    expect(primsMaze).toBeInstanceOf(Maze3D);
});

test("throws on constructor", () => {
    expect(() => {
        new Maze3DGenerator(3, 5, 5);
    }).toThrow();
});
