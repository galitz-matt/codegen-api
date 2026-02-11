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