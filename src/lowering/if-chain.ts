import { WhenBranch, DefaultBranch } from "../fragments/types";
import { block, seq } from "../layout/factories";
import { Node } from "../layout/ir";

export function ifChain(
    first: WhenBranch,
    ...rest: [...WhenBranch[], DefaultBranch] | WhenBranch[] | []
): Node {
    return seq(
        block(`if (${first.condition})`, 
            ...first.body
        ),
        ...rest.map(b => {
            switch (b.kind) {
                case "when":
                    return block(`else if (${b.condition})`,
                        ...b.body
                    );
                case "default":
                    return block(`else`,
                        ...b.body
                    );
            }
        })
    );   
}