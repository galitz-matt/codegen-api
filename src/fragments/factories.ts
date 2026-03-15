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
    ObjectTypeProp,
    UnionType,
    Type,
    LiteralType,
    LiteralExpr,
    RefExpr,
    ObjectExprProp,
    ObjectExpr,
    Expr,
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
    type: LiteralType | RefType
): StdParam {
    return {
        kind: "std",
        name,
        type
    };
}

export function defaultParam(
    name: string,
    type: LiteralType | RefType,
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
    type: LiteralType | RefType,
): OptionalParam {
    return {
        kind: "optional",
        name,
        type
    }
}

export function restParam(
    name: string,
    type: LiteralType | RefType
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
    returnType?: LiteralType | RefType,
    export?: boolean,
    async?: boolean,
    generics?: string[],
    formatOpts?: {
        newlineParams: boolean
    }
}): FnSignature {
    return {
        name: props.name,
        params: props.params,
        returnType: props.returnType ?? refType("void"),
        export: props.export ?? false,
        async: props.async ?? false,
        generics: props.generics,
        formatOpts: props.formatOpts
    }
}
//#endregion

//#region type
export function literalType(literal: string | number | boolean | null): LiteralType {
    return {
        kind: "literal",
        literal: typeof literal === "string" ? `"${literal}"` : literal
    }
}

export function refType(ref: string): RefType {
    return {
        kind: "ref",
        ref: ref
    }
}

export function objectType(...props: ObjectTypeProp[]): ObjectType {
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

export function typeProp(key: string, value: Type, opt?: boolean): ObjectTypeProp {
    return {
        key: key,
        value: value,
        optional: opt
    }
}

//#endregion

//#region Expr
export function literalExpr(literal: string | number | boolean | null): LiteralExpr {
    return {
        kind: "literal",
        literal: typeof literal === "string" ? `"${literal}"` : literal
    }
}

export function refExpr(ref: string): RefExpr {
    return {
        kind: "ref",
        ref
    }
}

export function objectExpr(...props: ObjectExprProp[]): ObjectExpr {
    return {
        kind: "object",
        props
    }
}

export function exprProp(key: string, value: Expr): ObjectExprProp {
    return {
        key,
        value
    }
}
//#endregion