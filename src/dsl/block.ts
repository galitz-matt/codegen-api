import { Doc } from "../ir/doc";

export function block(
    open: string,
    body: Doc[],
): Doc {
    return {
        kind: "block",
        open,
        body,
        close: "}"
    }
}