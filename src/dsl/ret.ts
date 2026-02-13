import { Doc } from "../layout/doc";
import { line } from "../layout/line";

export function ret(value: string): Doc {
    return line(`return ${value};`);
}