export interface imagesTextJSON {
    mapIcon:         { [key: string]: ImgInfo };
    tierIcon:        TierIcon;
    enchantmentIcon: { [key: string]: ImgInfo };
    charactersIcon:  { [key: string]: ImgInfo };
}

export interface ImgInfo {
    url:  string;
    name: string;
}

export interface TierIcon {
    bronze:   ImgInfo;
    silver:   ImgInfo;
    gold:     ImgInfo;
    platinum: ImgInfo;
    diamond:  ImgInfo;
    master:   ImgInfo;
}
