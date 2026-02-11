import { Doc } from "../ir/doc";

export function line(text: string): Doc {
    return {
        kind: "line",
        text
    }
}