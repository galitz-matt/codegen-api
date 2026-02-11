export type Doc =
    | { kind: "line", text: string }
    | { kind: "block", open: string, body: Doc, close: string }