/**
 * A challenge to solve
 */
class Boilerplate {
  public language!: string
  public code!: string
}

export class Challenge {
    public id!: string;
    public name!: string;
    public description!: string;
    public categoryId!: string;
    public isCodingChallenge!: boolean;
    public boilerplates!: Array<Boilerplate>;
    public languagesAllowed!: object;
    public points!: number;
    public timeAllowed!: number;

}
