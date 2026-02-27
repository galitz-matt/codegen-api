import { WhenBranch, DefaultBranch } from "../fragments/types";
import { braceBlock, seq } from "../layout/factories";
import { Node } from "../layout/ir";

export function ifChain(
    first: WhenBranch,
    ...rest: [...WhenBranch[], DefaultBranch] | WhenBranch[] | []
): Node {
    return seq(
        braceBlock(`if (${first.condition})`, 
            ...first.body
        ),
        ...rest.map(b => {
            switch (b.kind) {
                case "when":
                    return braceBlock(`else if (${b.condition})`,
                        ...b.body
                    );
                case "default":
                    return braceBlock(`else`,
                        ...b.body
                    );
            }
        })
    );   
}