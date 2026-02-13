import { Doc } from "./doc";

export function seq(
    ...docs: Doc[]
): Doc {
    return {
        kind: "seq",
        docs: docs
    }
}