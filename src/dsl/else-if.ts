import { Doc } from "../ir/doc";

export function elseif(
    condition: string,
    body: Doc[]
): Doc {
    return {
        kind: "block",
        open: `else if (${condition}) {`,
        body,
        close: "}"
    }
}