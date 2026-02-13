import { Doc } from "../layout/doc"

export type WhenBranch = Extract<Branch, { kind: "when" }>
export type CaseBranch = Extract<Branch, { kind: "case" }>
export type DefaultBranch = Extract<Branch, { kind: "default" }>

export type Branch = 
| {
    kind: "when";
    condition: string;
    body: Doc[];
}
| {
    kind: "case";
    value: string;
    body: Doc[];
}
| {
    kind: "default";
    body: Doc[];
}