import { block, line } from "../layout/factories";
import { render } from "../render";

export function namedImport(
    imports: string[],
    module: string,
    options?: {
        type?: boolean;
        multiline?: boolean;
    }
) {
    const typeSeg = options?.type ? "type " : "";
    if (options?.multiline) {
        return block(
            `import ${typeSeg}{`,
            imports.map(i => line(i + ",")),
            `} from ${module}`
        );
    }
    return line(
        `import ${typeSeg}{ ${imports.join(", ")} } from "${module}"`
    );
}