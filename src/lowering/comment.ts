import { line, seq } from "../layout/factories";
import { Node } from "../layout/ir";

export function inline(comment: string): Node {
    return line(`// ${comment}`);
}

export function multiline(...comments: string[]): Node {
    return seq(
        line("/*"),
        ...comments.map(c => line(c)),
        line("*/")
    )
}

export function docstring(...comments: string[]): Node {
    return seq(
        line("/**"),
        ...comments.map(c => line(` * ${c}`)),
        line("*/")
    )
}