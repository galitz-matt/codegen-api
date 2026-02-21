import { Node } from "../layout/ir";
import { line } from "../layout/factories";

export function ret(value: string): Node {
    return line(`return ${value};`);
}