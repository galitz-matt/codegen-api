import { Doc } from "./ir/doc";

export function render(doc: Doc): string {
    return _render(doc, 0);
}

function _render(doc: Doc, depth: number): string {
    switch (doc.kind) {
        case "line":
            return indent(doc.text, depth)
        case "block":
            return [
                indent(doc.open, depth),
                ...doc.body.map(d => _render(d, depth + 1)).join("\n"),
                indent(doc.close, depth)
            ].join("\n")
        case "seq":
            return doc.docs.map(d => _render(d, depth)).join("\n");
    }
}

function indent(text: string, indent: number): string {
    return "\t".repeat(indent) + text;
}