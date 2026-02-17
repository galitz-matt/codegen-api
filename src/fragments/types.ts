import { Document } from "../layout/types"

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


export type FnSignature = {
    name: string,
    params?: Params,
    returnType?: string,
    isExport?: boolean,
    isAsync?: boolean
}

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