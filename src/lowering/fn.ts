import { Block, Document } from "../layout/types";
import { FnProps } from "../syntax/fn-props";
import { Params } from "../syntax/params";
import { block } from "../layout/factories";

export function fn(
    props: FnProps,
    ...body: Document
): Block {
    return block(
        renderFunctionSignature(
            props.name,
            props.params ?? [],
            props.isExport ?? false,
            props.isAsync ?? false,
            props.returnType ?? "void",
        ),
        body,
    );
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