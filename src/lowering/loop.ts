import { Block, Document, Node } from "../layout/ir";
import { block } from "../layout/factories";

export function forLoop(
    iterator: string,
    body: Node[]
): Node {
    return block(`for (${iterator})`, body);
}

export function whileLoop(
    condition: string,
    body: Node[]
): Node {
    return block(`while (${condition})`, body)
}