import { Node } from "../layout/ir";
import { FnSignature } from "../fragments/types";
import { braceBlock } from "../layout/factories";

export function fn(
    signature: FnSignature,
    ...body: Node[]
): Node {
    return braceBlock(signature,
        ...body
    )
}