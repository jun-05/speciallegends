export interface abilityLocaleJson {
    characterAbility: { [key: string]: { [key: string]: AbilityInfo } };
}

export interface AbilityInfo {
    name:   string;
    effect: string;
}
