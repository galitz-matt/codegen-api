import { Node } from "../layout/ir"

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

export type FnSignature = string

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