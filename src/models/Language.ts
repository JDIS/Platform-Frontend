/**
 * A supported language
 */
export class Language {
  public id!: string
  public name!:	string
  public bin!: string
  public fileExtension!: string
  public dockerImage!: string
  public dockerCompiler!: string
  public compiledPostfix!: string
  public runPreArgs!: Array<string>
  public interpreter!: boolean
  public highlight!: string
}
