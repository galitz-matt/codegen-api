import { Line, Node, Block, Document } from "./types";

export function document(...nodes: Node[]): Document {
    return nodes;
}

export function block(
    header: string,
    body: Node[],
): Block {
    return {
        kind: "block",
        open: header + " {",
        body,
        close: "}"
    }
}

export function line(text: string): Line {
    return {
        kind: "line",
        text
    }
}