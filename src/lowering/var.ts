import { Expr, LiteralType, ObjectExprProp, RefType } from "../fragments/types";
import { block, line } from "../layout/factories";
import { Node } from "../layout/ir";

export function mutable(
    name: string,
    expr: Expr,
    type?: LiteralType | RefType
): Node {
    return variable(
        "let",
        name,
        expr,
        type
    );
}

export function constant(
    name: string,
    expr: Expr,
    type?: LiteralType | RefType
): Node {
    return variable(
        "const",
        name,
        expr,
        type
    );
}

function variable(
    dec: "const" | "let",
    name: string,
    expr: Expr,
    type?: LiteralType | RefType
): Node {
    const lhs = `${dec} ${name}${getTypeAnnotation(type)}`
    switch (expr.kind) {
        case "literal":
            return line(`${lhs} = ${expr.literal}`);
        case "ref":
            return line(`${lhs} = ${expr.ref}`);
        case "object":
            return block(
                `${lhs} = {`,
                expr.props.map(p => lowerProp(p)),
                "}"
            )
    }
}

function lowerProp(prop: ObjectExprProp): Node {
    switch(prop.value.kind) {
        case "literal":
            return line(`${prop.key}: ${prop.value.literal},`);
        case "ref":
            return line(`${prop.key}: ${prop.value.ref},`);
        case "object":
            return block(
                `${prop.key}: {`,
                prop.value.props.map(p => lowerProp(p)),
                "},"
            )
    }
}

function getTypeAnnotation(type?: LiteralType | RefType): string {
    if (!type) return "";
    switch (type.kind) {
        case "literal":
            return `: ${type.literal}`;
        case "ref":
            return `: ${type.ref}`;
    }
}