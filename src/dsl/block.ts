import { Doc } from "../ir/doc";

export function block(
    open: string,
    body: Doc[],
    close: string,
): Doc {
    return {
        kind: "block",
        open,
        body,
        close
    }
}