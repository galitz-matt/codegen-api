import { Branch, DefaultBranch } from "../ir/branch";
import { Doc } from "../ir/doc";
import { block } from "./block";
import { seq } from "./seq";

export function cond(
    branches: Branch[],
    otherwise?: DefaultBranch
): Doc {
    const [first, ...rest] = branches;

    if (otherwise) {
        return seq(
            block(`if (${first.discriminator}) {`,
                first.body
            ),
            ...rest.map(b => 
                block(`else if (${b.discriminator}) {`,
                    b.body
                )
            ),
            block(`else {`, 
                otherwise.body
            )
        );
    }
    return seq(
        block(`if (${first.discriminator}) {`,
            first.body
        ),
        ...rest.map(b => 
            block(`else if (${b.discriminator}) {`,
                b.body
            )
        )
    );
}