/**
 * A challenge to solve
 */
export class Challenge {
    public id!: string;
    public name!: string;
    public description!: string;
    public categoryId!: string;
    public isCodingChallenge!: boolean;
    public boilerplates!: object;
    public languagesAllowed!: object;
    public points!: number;
    public timeAllowed!: number;

}
