import { CaseBranch, DefaultBranch, Expr, LiteralExpr, RefExpr } from "../fragments/types";
import { braceBlock } from "../layout/factories";
import { Node } from "../layout/ir";

export function switchOn(
    expr: string,
    ...branches: [...CaseBranch[], DefaultBranch] | CaseBranch[] | [DefaultBranch] | []
): Node {
    return braceBlock(`switch ${expr})`,
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