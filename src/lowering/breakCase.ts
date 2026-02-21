import { line } from "../layout/factories";
import { Node } from "../layout/ir";

export function breakCase(): Node {
    return line("break;");
}