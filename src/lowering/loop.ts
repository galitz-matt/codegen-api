import { Node } from "../layout/ir";
import { braceBlock } from "../layout/factories";

export function forLoop(
    iterator: string,
    ...body: Node[]
): Node {
    return braceBlock(`for (${iterator})`, ...body);
}

export function whileLoop(
    condition: string,
    body: Node[]
): Node {
    return braceBlock(`while (${condition})`, ...body)
}