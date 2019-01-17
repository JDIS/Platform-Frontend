import { Test } from "@/models/Test";

/**
 * A challenge test
 */

export class ChallengeTest {
  constructor(test: Test) {
    this.id = test.id;
    this.name = test.name;
  }

  public id!: string;
  public name!: string;
  public isSuccess!: boolean;
  public isTimeout!: boolean;
  public isCompilationError!: boolean;
  public output!: string;
  public error!: string;
}