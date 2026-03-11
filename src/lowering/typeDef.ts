import { LiteralType, ObjectType, PropExpr, RefType, TypeExpr } from "../fragments/types";
import { block, line, prefix, seq } from "../layout/factories";
import { Node } from "../layout/ir";

export function typeDef(
    name: string,
    rhs: TypeExpr,
    expose = false
): Node {
    const exportSeg = expose ? "export " : "";
    const lhs = `${exportSeg}type ${name}` 

    switch (rhs.kind) {
        case "literal":
            if (typeof rhs.value === "string") {
                return line(`${lhs} = "${rhs.value}"`)
            }
            return line(`${lhs} = ${rhs.value}`)
        case "ref":
            return line(`${lhs} = ${rhs.name}`);
        case "object":
            return block(
                `${lhs} = {`,
                rhs.props.map(p => lowerProp(p)),
                "}"
            );
        case "union":
            return seq(
                line(`${lhs} =`),
                ...rhs.members.map(m => lowerType(m))
            );
    }
}

function lowerProp(prop: PropExpr): Node {
    const optSeg = prop.optional ? "?" : "";
    const lhs = `${prop.name}${optSeg}`

    switch (prop.rhs.kind) {
        case "literal":
            if (typeof prop.rhs.value === "string")
                return line(`${lhs}: "${prop.rhs.value}"`);
            return line(`${lhs}: ${prop.rhs.value}`)
        case "ref":
            return line(`${lhs}: ${prop.rhs.name};`);
        case "object":
            return block(
                `${lhs}: {`,
                prop.rhs.props.map(p => lowerProp(p)),
                "};"
            )
        case "union":
            return block(
                `${lhs}:`,
                prop.rhs.members.map(m => prefix("| ", lowerType(m)))
            )
    }
}

function lowerType(type: LiteralType | RefType | ObjectType): Node {
    switch (type.kind) {
        case "literal":
            if (typeof type.value === "string")
                return line(`"${type.value}"`)
            return line(`${type.value}`)
        case "ref":
            return line(type.name);
        case "object":
            return block(
                "{",
                type.props.map(p => lowerProp(p)),
                "}"
            )
    }
}