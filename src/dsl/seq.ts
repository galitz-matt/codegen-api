import { Doc } from "../ir/doc";

export function seq(
    ...docs: Doc[]
): Doc {
    return {
        kind: "seq",
        docs: docs
    }
}