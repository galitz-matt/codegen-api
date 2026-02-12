import { Branch, DefaultBranch } from "../ir/branch";
import { Doc } from "../ir/doc";
import { block } from "./block";

export function switchOn(
    expr: string,
    cases: Branch[],
    def?: DefaultBranch
): Doc {
    const body = [
        ...cases.map(c =>
            block(
                `case ${c.discriminator}: {`,
                c.body
            )
        )
    ]
    if (!!def) {
        body.push(
            block(
                `default: {`,
                def.body
            )
        );
    }

    return block(
        `switch (${expr}) {`,
        body
    )
}