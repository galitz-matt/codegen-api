import { Block, Document } from "../layout/types";
import { block } from "../layout/factories";

export function forLoop(
    iterator: string,
    ...body: Document
): Block {
    return block(`for (${iterator})`, body);
}

export function whileLoop(
    condition: string,
    body: Document
): Block {
    return block(`while (${condition})`, body)
}