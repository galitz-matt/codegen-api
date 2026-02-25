import { Node } from "../layout/ir"
import { 
    CaseBranch, 
    DefaultBranch, 
    WhenBranch,
    Param,
    FnSignature,
    RestParam,
    OptionalParam,
    DefaultParam,
    StdParam,
} from "./types"

//#region branches
export function when(condition: string, ...body: Node[]): WhenBranch {
    return {
        kind: "when",
        condition,
        body
    }
}

export function caseOf(value: string, ...body: Node[]): CaseBranch {
    return {
        kind: "case",
        value,
        body
    }
}

export function otherwise(...body: Node[]): DefaultBranch {
    return {
        kind: "default",
        body
    }
}
//#endregion

//#region params
export function params(
    ...paramList: Param[]
): Param[] {
    return paramList;
}

export function stdParam(
    name: string,
    type: string
): StdParam {
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
): DefaultParam {
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
): OptionalParam {
    return {
        kind: "optional",
        name,
        type
    }
}

export function restParam(
    name: string,
    type: string
): RestParam {
    return {
        kind: "rest",
        name,
        type
    };
}
//#endregion


export function fnSignature(props: {
    name: string,
    params?: Param[],
    returnType?: string,
    isExport?: boolean,
    isAsync?: boolean,
    newlineDelimiter?: boolean
}): FnSignature {
    const exportPart = props.isExport ? "export " : "";
    const asyncPart = props.isAsync ? "async " : "";
    const returnTypePart = props.returnType ?? "void";
    const delimiter = props.newlineDelimiter ? ",\n" : ", ";
    const paramsPart = props.params?.map(p => {
        const builder = [];

        if (p.kind === "rest") builder.push("...");
        builder.push(p.name);
        if (p.kind === "optional") builder.push("?");
        builder.push(": ");
        builder.push(p.type);
        if (p.kind === "default") builder.push(` = ${p.default}`)
        
        return builder.join("");
    }).join(delimiter);

    return `${exportPart}${asyncPart}function ${props.name}(${paramsPart}): ${returnTypePart}`;
}
