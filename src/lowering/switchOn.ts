import { Branch, CaseBranch, DefaultBranch } from "../syntax/branch";
import { Block } from "../layout/types";
import { block } from "../layout/factories";

export function switchOn(
    expr: string,
    ...branches: Branch[]
): Block {

}