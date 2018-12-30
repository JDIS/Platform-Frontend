import Model from "./Model";

class Language extends Model {
  static schema = {
    name: {type: String},
    bin: {type: String},
    fileExtension: {type: String},
    dockerImage: {type: String},
    dockerCompiler: {type: String},
    compiledPostfix: {type: String},
    runPreArgs: {type: Array},
    interpreter: {type: Boolean},
    highlight: {type: String}
  };
}

export default Language;
