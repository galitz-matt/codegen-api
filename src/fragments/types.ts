import { Block, Line, Node } from "../layout/ir"

//#region params
export type StdParam = {
    kind: "std",
    name: string,
    type: string
}

export type DefaultParam = {
    kind: "default",
    name: string,
    type: string,
    default: string
}

export type OptionalParam = {
    kind: "optional",
    name: string,
    type: string
}

export type RestParam = {
    kind: "rest",
    name: string,
    type: string
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
    name: string;
}

export type LiteralType = {
    kind: "literal";
    value: string | number | boolean | null;
}

export type ObjectType = {
    kind: "object";
    props: Prop[];
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

export type Prop = {
    kind: "prop";
    name: string;
    rhs: Type;
    optional?: boolean
}
//#endregion