import { Doc } from "../ir/doc";
import { Params } from "../ir/params";
import { block } from "./block";

type Options = {
    isExport: boolean,
    isAsync: boolean
}

const defaultOptions: Options = {
    isExport: false,
    isAsync: false
}

export function fn(
    name: string,
    params: Params = [],
    body: Doc[],
    returnType = "void",
    options: Options = defaultOptions
): Doc {

    return block(
        renderFunctionSignature(
            name,
            params,
            options.isExport,
            options.isAsync,
            returnType,
        ),
        body
    );
}

function renderFunctionSignature(
    name: string,
    params: Params,
    isExport: boolean,
    isAsync: boolean,
    returnType: string
): string {
    return `${renderExport(isExport)}${renderAsync(isAsync)}function ${name}(${renderParams(params)}): ${returnType}`
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