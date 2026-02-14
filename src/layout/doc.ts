export type Line = Extract<Doc, { kind: "line" }>
export type Block = Extract<Doc, { kind: "block" }>
export type Seq = Extract<Doc, {kind: "block" }>

export type Doc =
    | { kind: "line", text: string }
    | { kind: "block", header: string, body: Doc[] }
    | { kind: "seq", docs: Doc[] }