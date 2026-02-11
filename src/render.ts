import { Doc } from "./ir/doc";

export function render(doc: Doc): string {
    return _render(doc, 0);
}

function _render(doc: Doc, depth = 0): string {
    if (doc.kind === "line") {
        return indent(doc.text, depth);
    }
    return [
        indent(doc.open, depth),
        ...doc.body.map(d => _render(d, depth + 1)),
        indent(doc.close, depth)
    ].join("\n")
}

function indent(text: string, indent: number): string {
    return "\t".repeat(indent) + text;
}