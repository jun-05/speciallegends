
export interface localeTextJSON {
    tableTitle:           string;
    firstTableOption:     string;
    secondTableOption:    string;
    thirdTableOption:     string;
    mapListOptionName:    string;
    mapList:              { [key: string]: string };
    tierListOptionName:   string;
    tierList:             TierList;
    firstInfoHeadName:    string;
    secondInfoHeadName:   string;
    explanationText:      string;
    explanationTextByMap: string;
    updateTimeInfo:       string;
    characterName:        { [key: string]: string };
    enchantMentInfo:      { [key: string]: EnchantMentInfo };
}

export interface EnchantMentInfo {
    name:   string;
    effect: string;
}

export interface TierList {
    master:   string;
    diamond:  string;
    platinum: string;
    gold:     string;
    silver:   string;
    bronze:   string;
}
