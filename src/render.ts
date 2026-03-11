import { Document } from "./layout/ir";

export function render(doc: Document): string {
    return _render(doc, 0);
}

function _render(doc: Document, depth: number): string {
    switch (doc.kind) {
        case "line":
            return indent(depth) + doc.text;
        case "block":
            return [
                indent(depth) + doc.open,
                ...doc.body.map(n => _render(n, depth + 1)),
                ...(doc.close ? [indent(depth) + doc.close] : [])
            ].join("\n");
        case "seq":
            return doc.nodes.map(n => _render(n, depth)).join("\n");
    }
}

function indent(indent: number): string {
    return "    ".repeat(indent);
}