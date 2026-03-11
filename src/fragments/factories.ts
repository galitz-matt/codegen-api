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
    RefType,
    ObjectType,
    Prop,
    UnionType,
    Type,
    LiteralType,
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

//#region fn
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

export function fnSig(props: {
    name: string,
    params?: Param[],
    returnType?: string,
    isExport?: boolean,
    isAsync?: boolean,
    generics?: string[],
    newlineDelimiter?: boolean
}): FnSignature {
    const exportPart = props.isExport ? "export " : "";
    const asyncPart = props.isAsync ? "async " : "";
    const returnTypePart = props.returnType ?? "void";
    const genericsPart = props.generics ? `<${props.generics.join(", ")}>` : "";
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

    return `${exportPart}${asyncPart}function ${props.name}${genericsPart}(${paramsPart}): ${returnTypePart}`;
}
//#endregion

//#region type
export function prop(key: string, value: Type, opt?: boolean): Prop {
    return {
        kind: "prop",
        name: key,
        rhs: value,
        optional: opt
    }
}

export function literalType(value: string | number | boolean | null): LiteralType {
    return {
        kind: "literal",
        value
    }
}

export function refType(name: string): RefType {
    return {
        kind: "ref",
        name
    }
}

export function objectType(...props: Prop[]): ObjectType {
    return {
        kind: "object",
        props
    }
}

export function unionType(...unions: (RefType | ObjectType)[]): UnionType {
    return {
        kind: "union",
        members: unions
    }
}
//#endregion

//#region Expr


//#endregion