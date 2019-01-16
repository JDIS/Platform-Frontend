/**
 * A challenge to solve
 */
class Boilerplate {
  public language!: string
  public code!: string
}

class LanguagesAllowed {
  public whitelist!: Array<string>;
  public blacklist!: Array<string>;
}

export class Challenge {
  public id!: string;
  public name!: string;
  public description!: string;
  public category!: string;
  public isCodingChallenge!: boolean;
  public boilerplates!: Array<Boilerplate>;
  public languagesAllowed!: LanguagesAllowed;
  public points!: number;
  public timeAllowed!: number;
  public numberTests!: number;  
}
