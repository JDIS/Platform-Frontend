import ResourceApi from "./ResourceApi";
import Language from "../models/Language";

class LanguageApi extends ResourceApi {
  static resourceUrl = "languages";
  static resourceName = {
    singular: "language",
    plural: "languages",
  };
  static Resource = Language;

  getSupported(challenge) {
    let URL = this._getResourceUrl();
    if(challenge)
      URL += `?challenge=${challenge}`
    return this._doGet(URL).then(res => this._multiResourceResponse(res));
  }
};


export default LanguageApi;
