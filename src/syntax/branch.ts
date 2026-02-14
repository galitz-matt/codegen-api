import { Document } from "../layout/types"

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