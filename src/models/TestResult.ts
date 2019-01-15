/**
 * A test result
 */

 export class TestResult {
  public test!: string;
  public isSuccess!: boolean;
  public isTimeout!: boolean;
  public isCompilationError!: boolean;
  public output!: string;
  public error!: string;
}
