import { Node } from "../layout/ir"

export type Params = Param[]
export type Param = 
| {
    kind: "std",
    name: string,
    type: string,
}
| {
    kind: "default",
    name: string,
    type: string,
    default: string
}
| {
    kind: "optional",
    name: string,
    type: string,
}


export type FnSignature = string

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