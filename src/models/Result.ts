import {TestResult} from './TestResult';

export class Result {
  public challenge!: string;
  public user!: string;
  public percent!: number;
  public points!: number;
  public tests!: Array<TestResult>;
  public languagesAllowed!: object;
  public timeAllowed!: number;
}
