import { Document } from "./layout/types";

export function render(doc: Document): string {
    return _render(doc, 0);
}

function _render(doc: Document, depth: number): string {
    return doc.map(n => {
        switch(n.kind) {
            case "line": {
                return indent(n.text, depth);
            }
            case "block": {
                return [
                    indent(n.open, depth),
                    _render(n.body, depth + 1),
                    indent(n.close, depth)
                ].join("\n")
            }
        }
    }).join("\n")
}

function indent(text: string, indent: number): string {
    return "\t".repeat(indent) + text;
}