/**
 * A list of challenges grouped by a category
 */
import {Challenge} from '@/models/Challenge';

export class Category {
    /**
     * Category name
     */
    public key: string;
    public values: Challenge[];
    public isVisible: boolean = true;

    constructor(key: string, values: Challenge[]) {
        this.key = key;
        this.values = values;
    }
}
