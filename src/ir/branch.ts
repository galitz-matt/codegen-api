import { Doc } from "./doc"


export type WhenBranch = {
    condition: string,
    body: Doc[]
}

export type OtherwiseBranch = {
    body: Doc[]
}