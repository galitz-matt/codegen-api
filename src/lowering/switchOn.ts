import { CaseBranch, DefaultBranch } from "../fragments/types";
import { block } from "../layout/factories";
import { Node } from "../layout/ir";

export function switchOn(
    expr: string,
    ...branches: [...CaseBranch[], DefaultBranch] | CaseBranch[] | [DefaultBranch] | []
): Node {
    return block(expr,
        ...branches.map(b => {
            if (b.kind === "case") {
                return block(`case: ${b.value}`, 
                    ...b.body);
            } else {
                return block(`default:`, 
                    ...b.body);
            }
        })
    );
}