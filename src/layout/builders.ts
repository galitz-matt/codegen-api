import { Line, Node, Block, Document } from "./types";

export function document(...nodes: Node[]): Document {
    return nodes;
}

export function block(
    open: string,
    body: Node[],
    close: string,
): Block {
    return {
        kind: "block",
        open,
        body,
        close
    }
}

export function line(text: string): Line {
    return {
        kind: "line",
        text
    }
}