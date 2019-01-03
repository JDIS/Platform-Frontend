/**
 * Category for challenges
 */

export class Category {
    public id: string;
    public name: string;

    constructor(id: string, name: string) {
        this.name = name;
        this.id = id;
    }
}
