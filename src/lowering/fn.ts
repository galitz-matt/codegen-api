import { Node } from "../layout/ir";
import { FnSignature, LiteralType, Param, RefType } from "../fragments/types";
import { block, braceBlock, line, seq } from "../layout/factories";
import { render } from "../render";
import { defaultParam, params, refType, stdParam } from "../fragments/factories";

export function fn(
    signature: FnSignature,
    ...body: Node[]
): Node {
    if (signature.newline) {
        return seq(
            block(
                buildFnSigSegment(signature),
                buildParamsBody(signature.params)
            ),
            braceBlock(
                `): ${getTypeSegment(signature.returnType)}`,
                ...body
            )
        )
    }
    return braceBlock(
        buildFnSig(signature),
        ...body
    )
}

function buildFnSigSegment(sig: FnSignature): string {
    const fnName = sig.name;
    const exportSeg = getExportSegment(sig.export);
    const asyncSeg = getAsyncSegment(sig.async);
    const genericsSeg = buildGenericsSegment(sig.generics);

    return `${exportSeg}${asyncSeg}functin ${fnName}${genericsSeg}(`
}

function buildFnSig(sig: FnSignature): string {
    const fnName = sig.name;
    const returnTypeSeg = getTypeSegment(sig.returnType);
    const exportSeg = getExportSegment(sig.export);
    const asyncSeg = getAsyncSegment(sig.async);
    const genericsSeg = buildGenericsSegment(sig.generics);
    const paramsSeg = buildParamsSegment(sig.params);

    return `${exportSeg}${asyncSeg}function ${fnName}${genericsSeg}(${paramsSeg}): ${returnTypeSeg}`
}

function getTypeSegment(type: LiteralType | RefType | undefined): string {
    return `${type?.type ?? "void"}`;
}

function getExportSegment(isExport: boolean | undefined): string {
    return isExport ? "export " : "";
}

function getAsyncSegment(isAsync: boolean | undefined): string {
    return isAsync ? "async " : "";
}

function buildGenericsSegment(generics: string[] | undefined): string {
    if (!generics || generics.length === 0) return "";
    return `<${generics.join(",")}>`
}

function buildParamsBody(params: Param[] | undefined): Node[] {
    if (!params) return [];

    const paramLines = [];

    for (let i = 0; i < params.length; i++) {
        const p = params[i];
        const comma = i < params.length - 1 ? "," : "";
        switch (p.kind) {
            case "std":
                paramLines.push(line(`${p.name}: ${getTypeSegment(p.type)}${comma}`));
                break;
            case "default":
                paramLines.push(line(`${p.name}: ${getTypeSegment(p.type)} = ${p.default}${comma}`));
                break;
            case "optional":
                paramLines.push(line(`${p.name}?: ${getTypeSegment(p.type)}${comma}`));
                break;
            case "rest":
                paramLines.push(line(`...${p.name}: ${getTypeSegment(p.type)}`));
                break;
        }
    }

    return paramLines
}

function buildParamsSegment(params: Param[] | undefined): string {
    if (!params) return "";

    const paramList = [];
    for (const p of params) {
        switch(p.kind) {
            case "std":
                paramList.push(`${p.name}: ${getTypeSegment(p.type)}`);
                break;
            case "default":
                paramList.push(`${p.name}: ${getTypeSegment(p.type)} = ${p.default}`);
                break;
            case "optional":
                paramList.push(`${p.name}?: ${getTypeSegment(p.type)}`);
                break;
            case "rest":
                paramList.push(`...${p.name}: ${getTypeSegment(p.type)}`);
                break;
        }
    }
    return paramList.join(", ")
}



console.log(render(
    fn({
        name: "myFunction",
        params: params(
            stdParam("p1", refType("string")),
            defaultParam("def", refType("string"), "asdf")
        ),
        newline: true,
    },
        line(`console.log("abc")`)
    )
))