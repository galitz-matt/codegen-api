import { Branch, DefaultBranch, WhenBranch } from "../ir/branch";
import { Doc } from "../ir/doc";
import { block } from "./block";
import { seq } from "./seq";

export function cond(
    ...branches: Branch[]
): Doc {
    const whens: WhenBranch[] = [];
    let def: DefaultBranch | undefined;

    for (const b of branches) {
        if (b.kind === "when") whens.push(b);
        else if (b.kind === "default") def = b;
        else throw new Error(`Unexpected branch type: ${b.kind}`);
    }

    const [first, ...rest] = whens;
    if (!first) {
        throw new Error("cond() requires at least one 'when' branch");
    }

    return seq(
        block(`if (${first.condition}) {`, ...first.body),
        ...rest.map(b => 
            block(`else if (${b.condition}) {`, ...b.body)
        ),
        ...(def ? [block("else {", ...def.body)] : [])
    );
}