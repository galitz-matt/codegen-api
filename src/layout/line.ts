import { Doc } from "./doc";

export function line(text: string): Doc {
    return {
        kind: "line",
        text
    }
}