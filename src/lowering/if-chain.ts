import { WhenBranch, DefaultBranch } from "../fragments/types";
import { Node } from "../layout/ir";

export function ifChain(
    first: WhenBranch,
    ...rest: [...WhenBranch[], DefaultBranch]
): Node {

}