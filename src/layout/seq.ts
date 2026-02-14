import { render } from "../render";
import { Block, Doc, Line } from "./doc";

export function seq(
    ...docs: (Line | Block)[]
): Doc {
    return {
        kind: "seq",
        docs: docs
    }
}