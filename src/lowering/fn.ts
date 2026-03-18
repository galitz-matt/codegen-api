import { Node } from "../layout/ir";
import { FnSignature, LiteralType, Param, RefType } from "../fragments/types";
import { braceBlock } from "../layout/factories";

export function fn(
    signature: FnSignature,
    ...body: Node[]
): Node {
    return braceBlock(
        buildFnSig(signature),
        ...body
    );
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
            case "optional":
                paramList.push(`${p.name}?: ${getTypeSegment(p.type)}`);
            case "rest":
                paramList.push(`...${p.name}: ${getTypeSegment(p.type)}`);
        }
    }
    return paramList.join(", ")
}