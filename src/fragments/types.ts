import { Document } from "../layout/ir"

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

export type WhenBranch = Extract<Branch, { kind: "when" }>
export type CaseBranch = Extract<Branch, { kind: "case" }>
export type DefaultBranch = Extract<Branch, { kind: "default" }> 
export type Branch = 
| {
    kind: "when";
    condition: string;
    body: Document;
}
| {
    kind: "case";
    value: string;
    body: Document;
}
| {
    kind: "default";
    body: Document;
}