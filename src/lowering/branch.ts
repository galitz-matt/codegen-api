import { Branch } from "../syntax/branch"
import { Document } from "../layout/types"

export function when(condition: string, ...body: Document): Branch {
    return {
        kind: "when",
        condition,
        body
    }
}

export function caseOf(value: string, ...body: Document): Branch {
    return {
        kind: "case",
        value,
        body
    }
}

export function otherwise(...body: Document): Branch {
    return {
        kind: "default",
        body
    }
}