import { Doc } from "../ir/doc";
import { line } from "./line";

export function ret(value: string): Doc {
    return line(`return ${value};`);
}