import { abilityLocaleJson } from "./abilityLocaleTextJson";
import { imagesTextJSON } from "./imageJsonTypes";
import { localeTextJSON } from "./localeTextTJsonypes";

export interface pageData {
    abilityTextJson : abilityLocaleJson | null,
    localeTextJson:localeTextJSON | null,
    imageTextJson:imagesTextJSON | null
  }