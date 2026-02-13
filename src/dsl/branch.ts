import { Branch } from "../syntax/branch"
import { Doc } from "../layout/doc"

export function when(condition: string, ...body: Doc[]): Branch {
    return {
        kind: "when",
        condition,
        body
    }
}

export function caseOf(value: string, ...body: Doc[]): Branch {
    return {
        kind: "case",
        value,
        body
    }
}

export function otherwise(...body: Doc[]): Branch {
    return {
        kind: "default",
        body
    }
}