import { line } from "../layout/factories";
import { Node } from "../layout/ir";

export function newline(): Node {
    return line("\n");
}