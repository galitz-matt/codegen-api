import { Document, Node } from "../layout/types";
import { FnSignature } from "../fragments/types";
import { block } from "../layout/factories";

export function fn(
    signature: FnSignature,
    body: Document
): Document {
    return [ 
        block(
            signature,
            body
        )
    ]
}