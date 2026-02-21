import { Line, Node, Block, Seq } from "./ir";

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

export function seq(...nodes: (Line | Block)[]): Seq {
    return {
        kind: "seq",
        nodes
    }
}