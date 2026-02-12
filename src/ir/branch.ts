import { Doc } from "./doc"

export type Branch = {
    discriminator: string;
    body: Doc[];
}

export type DefaultBranch = {
    body: Doc[];
}