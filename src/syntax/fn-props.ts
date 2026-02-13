import { Params } from "./params"

export type FnProps = {
    name: string,
    params?: Params,
    returnType?: string,
    isExport?: boolean,
    isAsync?: boolean
}
