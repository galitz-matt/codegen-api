import { Doc } from "../layout/doc";
import { block } from "../layout/block";

export function forLoop(
    iterator: string,
    ...body: Doc[]
): Doc {
    return block(`for (${iterator})`, 
        ...body
    );
}

export function whileLoop(
    condition: string,
    body: Doc[]
): Doc {
    return block(`while (${condition})`,
        ...body
    );
}