import { Document } from "../layout/ir"
import { 
    CaseBranch, 
    DefaultBranch, 
    WhenBranch,
    Param,
    Params,
    FnSignature
} from "./types"

export function when(condition: string, ...body: Document): WhenBranch {
    return {
        kind: "when",
        condition,
        body
    }
}

export function caseOf(value: string, ...body: Document): CaseBranch {
    return {
        kind: "case",
        value,
        body
    }
}

export function otherwise(...body: Document): DefaultBranch {
    return {
        kind: "default",
        body
    }
}

export function param(
    name: string,
    type: string
): Param {
    return {
        kind: "std",
        name,
        type
    };
}

export function defaultParam(
    name: string,
    type: string,
    def: string,
): Param {
    return {
        kind: "default",
        name,
        type,
        default: def
    };
}

export function optionalParam(
    name: string,
    type: string,
): Param {
    return {
        kind: "optional",
        name,
        type
    }
}

export function fnSignature(props: {
    name: string,
    params?: Params,
    returnType?: string,
    isExport?: boolean,
    isAsync?: boolean
}): FnSignature {
    const exportPart = props.isExport ? "export " : "";
    const asyncPart = props.isAsync ? "async " : "";
    const returnTypePart = props.returnType ?? "void";
    const paramsPart = props.params?.map(p => {
        const builder = [];
        builder.push(p.name);

        if (p.kind === "optional") {
            builder.push("?");
        }
        builder.push(": ");
        builder.push(p.type);
        if (p.kind === "default") {
            builder.push(` = ${p.default}`);
        }
        
        return builder.join("");
    }).join(", ");

    return `${exportPart}${asyncPart}function ${props.name}(${paramsPart}): ${returnTypePart}`;
}
