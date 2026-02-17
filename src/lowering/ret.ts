import { Document, Line } from "../layout/types";
import { line } from "../layout/factories";

export function ret(value: string): Line {
    return line(`return ${value};`);
}