import { Branch, CaseBranch, DefaultBranch } from "../syntax/branch";
import { Doc } from "../layout/doc";
import { block } from "../layout/block";

export function switchOn(
    expr: string,
    ...branches: Branch[]
): Doc {
    const cases: CaseBranch[] = [];
    let def: DefaultBranch | undefined;

    for (const b of branches) {
        if (b.kind === "case") cases.push(b);
        else if (b.kind === "default") def = b;
        else throw new Error(`Unexpected branch type: ${b.kind}`);
    }

    if (cases.length === 0)
        throw new Error("switchOn requires at least one 'case' branch");

    return block(`switch (${expr}) {`,
        ...cases.map(c =>
            block(`case ${c.value}: {`, ...c.body)
        ),
        ...(def ? [block("default: {", ...def.body)] : [])
    )
}