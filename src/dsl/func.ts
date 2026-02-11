import { Doc } from "../ir/doc";
import { Params } from "../ir/params";

export function func(
    name: string,
    params: Params = [],
    expose = false,
    returnType = "void",
    body: Doc[]
): Doc {
    return {
        kind: "block",
        open: renderFunctionSignature(
            name,
            params,
            expose,
            returnType
        ),
        body,
        close: "}"
    };
}

function renderFunctionSignature(
    name: string,
    params: Params,
    expose: boolean,
    returnType: string
): string {
    return `${renderExport(expose)}function ${name}(${renderParams(params)}): ${returnType}`
}

function renderExport(expose: boolean): string {
    return `${expose ? "export ": ""}`
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