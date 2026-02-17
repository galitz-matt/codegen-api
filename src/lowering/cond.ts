import { WhenBranch, DefaultBranch } from "../fragments/types";
import { Document } from "../layout/types";

export function cond(
    first: WhenBranch,
    ...rest: [...WhenBranch[], DefaultBranch]
): Document {

}