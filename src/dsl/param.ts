import { Param } from "../syntax/params";

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
