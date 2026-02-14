import { Doc } from "./doc";

export function block(
    open: string,
    ...body: Doc[]
): Doc {
    return {
        kind: "block",
        header: open,
        body
    }
}