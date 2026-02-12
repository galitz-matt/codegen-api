import { Doc } from "../ir/doc";
import { Params } from "../ir/params";
import { block } from "./block";

type FnProps = {
    name: string,
    params?: Params,
    returnType?: string,
    isExport?: boolean,
    isAsync?: boolean
}

/**
 * 
 * @param {FnProps} props - { name: string, params?: Param[], returnType?: string, isExport?: boolean, isAsync?: boolean }
 * @param {Doc[]} body 
 * @returns 
 */
export function fn(
    props: FnProps,
    ...body: Doc[]
): Doc {
    return block(
        renderFunctionSignature(
            props.name,
            props.params ?? [],
            props.isExport ?? false,
            props.isAsync ?? false,
            props.returnType ?? "void",
        ),
        ...body
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