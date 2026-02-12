import { Branch, DefaultBranch } from "../ir/branch"
import { Doc } from "../ir/doc"

export function when(condition: string, body: Doc[]): Branch {
    return {
        discriminator: condition,
        body
    }
}

export function caseOf(value: string, body: Doc[]): Branch {
    return {
        discriminator: value,
        body
    }
}

export function otherwise(body: Doc[]): DefaultBranch {
    return {
        body
    }
}