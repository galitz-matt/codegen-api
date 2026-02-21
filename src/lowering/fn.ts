import { Node } from "../layout/ir";
import { FnSignature } from "../fragments/types";
import { block } from "../layout/factories";

export function fn(
    signature: FnSignature,
    ...body: Node[]
): Node {
    return block(signature,
        ...body
    )
}