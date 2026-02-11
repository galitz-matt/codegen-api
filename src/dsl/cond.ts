import { WhenBranch, OtherwiseBranch } from "../ir/branch";
import { Doc } from "../ir/doc";
import { block } from "./block";
import { seq } from "./seq";

export function cond(
    branches: WhenBranch[],
    otherwise: OtherwiseBranch
): Doc {
    const [first, ...rest] = branches;

    return seq(
        block(
            `if (${first.condition}) {`,
            first.body
        ),
        ...rest.map(b => 
            block(
                `else if (${b.condition}) {`,
                b.body
            )
        ),
        block(
            `else {`,
            otherwise.body
        )
    );
}

export function when(condition: string, body: Doc[]): WhenBranch {
    return {
        condition,
        body
    }
}

export function otherwise(body: Doc[]): OtherwiseBranch {
    return {
        body
    }
}