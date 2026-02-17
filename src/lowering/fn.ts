import { Block, Document } from "../layout/types";
import { FnSignature } from "../fragments/types";
import { Params } from "../fragments/types";
import { block } from "../layout/factories";

export function fn(
    props: FnSignature,
    body: Document
): Document {
    return [ 
        block(
            renderFunctionSignature(
                props.name,
                props.params ?? [],
                props.isExport ?? false,
                props.isAsync ?? false,
                props.returnType ?? "void",
            ),
            body,
        )
    ]
}

function renderFunctionSignature(
    name: string,
    params: Params,
    isExport: boolean,
    isAsync: boolean,
    returnType: string
): string {
    return `${renderExport(isExport)}${renderAsync(isAsync)}function ${name}(${renderParams(params)}): ${returnType} {`
}

function renderExport(isExport: boolean): string {
    return `${isExport ? "export ": ""}`;
}

function renderAsync(isAsync: boolean): string {
    return `${isAsync ? "async ": ""}`;
}

function renderParams(params: Params): string {
    return params.map(p => {
        const builder = [];
        builder.push(p.name);
        if (p.kind === "optional")
            builder.push("?");
        builder.push(": ");
        builder.push(p.type)
        if (p.kind === "default")
            builder.push(` = ${p.default}`);
        return builder.join("");
    }).join(", ");
}