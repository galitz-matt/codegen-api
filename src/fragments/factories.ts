import { Document } from "../layout/types"
import { 
    CaseBranch, 
    DefaultBranch, 
    WhenBranch,
    Param
} from "./types"

export function when(condition: string, ...body: Document): WhenBranch {
    return {
        kind: "when",
        condition,
        body
    }
}

export function caseOf(value: string, ...body: Document): CaseBranch {
    return {
        kind: "case",
        value,
        body
    }
}

export function otherwise(...body: Document): DefaultBranch {
    return {
        kind: "default",
        body
    }
}

export function param(
    name: string,
    type: string
): Param {
    return {
        kind: "std",
        name,
        type
    };
}

export function defaultParam(
    name: string,
    type: string,
    def: string,
): Param {
    return {
        kind: "default",
        name,
        type,
        default: def
    };
}

export function optionalParam(
    name: string,
    type: string,
): Param {
    return {
        kind: "optional",
        name,
        type
    }
}
