import { Hop } from "./hop.model";
import { Malt } from "./malt.model";

export interface Ingredient {
    malt?: Malt[];
    hops?: Hop[];
    yeast?: string;
}
