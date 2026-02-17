import { Branch, DefaultBranch, WhenBranch } from "../syntax/branch";
import { Document } from "../layout/types";

export function cond(
    first: WhenBranch,
    ...rest: [...WhenBranch[], DefaultBranch]
): Document {

}