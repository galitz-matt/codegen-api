import { Document, Line } from "../layout/types";
import { line } from "../layout/builders";

export function ret(value: string): Line {
    return line(`return ${value};`);
}