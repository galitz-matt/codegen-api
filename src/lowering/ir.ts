import { Node } from "../layout/ir";

export type Many = {
    kind: "many";
    nodes: Node[];
}

export type ExpandedNode = Node | Many