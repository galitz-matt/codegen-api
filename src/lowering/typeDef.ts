import { LiteralType, ObjectType, ObjectTypeProp, RefType, Type } from "../fragments/types";
import { block, line, prefix, seq } from "../layout/factories";
import { Node } from "../layout/ir";

export function typeDef(
    name: string,
    rhs: Type,
    expose = false
): Node {
    const exportSeg = expose ? "export " : "";
    const lhs = `${exportSeg}type ${name}` 

    switch (rhs.kind) {
        case "literal":
            return line(`${lhs} = ${rhs.literal}`)
        case "ref":
            return line(`${lhs} = ${rhs.ref}`);
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

function lowerProp(prop: ObjectTypeProp): Node {
    const optSeg = prop.optional ? "?" : "";
    const lhs = `${prop.key}${optSeg}`

    switch (prop.value.kind) {
        case "literal":
            return line(`${lhs}: ${prop.value.literal}`)
        case "ref":
            return line(`${lhs}: ${prop.value.ref};`);
        case "object":
            return block(
                `${lhs}: {`,
                prop.value.props.map(p => lowerProp(p)),
                "};"
            )
        case "union":
            return block(
                `${lhs}:`,
                prop.value.members.map(m => prefix("| ", lowerType(m)))
            )
    }
}

function lowerType(type: LiteralType | RefType | ObjectType): Node {
    switch (type.kind) {
        case "literal":
            return line(`${type.literal}`)
        case "ref":
            return line(type.ref);
        case "object":
            return block(
                "{",
                type.props.map(p => lowerProp(p)),
                "}"
            )
    }
}