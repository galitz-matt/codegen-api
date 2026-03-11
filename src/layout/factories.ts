import { Line, Node, Block, Seq } from "./ir";

export function block(
    open: string,
    body: Node[],
    close?: string
): Block {
    return {
        kind: "block",
        open,
        body,
        close,
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

//#region sugar
export function braceBlock(
    header: string,
    ...body: Node[]
): Block {
    return block(
        header + " {",
        body,
        "}"
    )
}

export function prefix(
    pre: string,
    node: Node
): Node {
    switch(node.kind) {
        case "line":
            return line(pre + node.text);
        case "block":
            return block(
                pre + node.open,
                node.body,
                node.close
            )
        case "seq":
            return node;
    }
}
//#endregion