import { Doc } from "../ir/doc";

export function iff(
    condition: string,
    body: Doc[],
): Doc {
    return {
        kind: "block",
        open: `if (${condition}) {`,
        body,
        close: "}"
    }
}