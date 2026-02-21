import { Line, Node, Block, Document, Seq } from "./ir";

export function block(
    header: string,
    ...body: Node[]
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

export function seq(...nodes: Node[]): Seq {
    return {
        kind: "seq",
        nodes
    }
}