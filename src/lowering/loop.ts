import { Block, Document } from "../layout/ir";
import { block } from "../layout/factories";

export function forLoop(
    iterator: string,
    body: Document
): Document {
    return [
        block(`for (${iterator})`, body)
    ]
}

export function whileLoop(
    condition: string,
    body: Document
): Document {
    return [
        block(`while (${condition})`, body)
    ]
}