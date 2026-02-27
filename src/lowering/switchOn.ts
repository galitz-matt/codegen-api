import { CaseBranch, DefaultBranch } from "../fragments/types";
import { braceBlock } from "../layout/factories";
import { Node } from "../layout/ir";

export function switchOn(
    expr: string,
    ...branches: [...CaseBranch[], DefaultBranch] | CaseBranch[] | [DefaultBranch] | []
): Node {
    return braceBlock(expr,
        ...branches.map(b => {
            if (b.kind === "case") {
                return braceBlock(`case: ${b.value}`, 
                    ...b.body);
            } else {
                return braceBlock(`default:`, 
                    ...b.body);
            }
        })
    );
}