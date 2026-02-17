import { Document, Line } from "../layout/ir";
import { line } from "../layout/factories";

export function ret(value: string): Document {
    return [
        line(`return ${value};`)
    ]
}