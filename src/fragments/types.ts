import { Block, Line, Node } from "../layout/ir"

//#region params
export type StdParam = {
    kind: "std",
    name: string,
    type: LiteralType | RefType
}

export type DefaultParam = {
    kind: "default",
    name: string,
    type: LiteralType | RefType,
    default: string
}

export type OptionalParam = {
    kind: "optional",
    name: string,
    type: LiteralType | RefType
}

export type RestParam = {
    kind: "rest",
    name: string,
    type: LiteralType | RefType
}

export type RequiredParam =
    | StdParam
    | DefaultParam

export type Param = 
    | StdParam
    | DefaultParam
    | OptionalParam
    | RestParam
//#endregion

//#region fn
export type FnSignature = string
//#endregion

//#region branches
export type WhenBranch = {
    kind: "when";
    condition: string;
    body: Node[];
}

export type CaseBranch = {
    kind: "case";
    value: string;
    body: Node[];
}

export type DefaultBranch = {
    kind: "default";
    body: Node[];
}

export type Branch =
    | WhenBranch
    | CaseBranch
    | DefaultBranch
//#endregion

//#region type
export type RefType = {
    kind: "ref";
    ref: string;
}

export type LiteralType = {
    kind: "literal";
    literal: string | number | boolean | null;
}

export type ObjectType = {
    kind: "object";
    props: ObjectTypeProp[];
}

export type UnionType = {
    kind: "union";
    members: (LiteralType | RefType | ObjectType)[];
}

export type Type =
    | LiteralType
    | RefType
    | ObjectType
    | UnionType

export type ObjectTypeProp = {
    key: string;
    value: Type;
    optional?: boolean
}
//#endregion

//#region expr
export type LiteralExpr = {
    kind: "literal";
    literal: string | number | boolean | null;
}

export type RefExpr = {
    kind: "ref";
    ref: string;
}

export type ObjectExpr = {
    kind: "object";
    props: ObjectExprProp[]
}

export type Expr =
    | LiteralExpr
    | RefExpr
    | ObjectExpr

export type ObjectExprProp = {
    key: string;
    value: Expr;
}
//#endregion