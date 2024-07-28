// types.ts

export type RootStackParamList = {
  Main: HomeScreenProps;
  PromotionDetail: {id: number};
};

export type RootTabBarList = {
  Home: HomeScreenProps;
  Plus: any;
  AnotherScreen: any;
};

export type HomeScreenProps = {
  fetchPromotions: () => Promise<Promotions[]>;
  fetchTags: () => Promise<TagType[]>;
};

export type PromotionDetailScreenProps = {
  route: {
    params: {
      id: number;
    };
  };
};

export interface TagType {
  IconUrl: string;
  Id: number;
  Name: string;
  Rank: number;
}

export type TagsResponse = TagType[];


export interface Promotions {
  BrandIconColor: string;
  BrandIconUrl: string;
  BrandPromotionCardParticipationText: string;
  Id: number;
  ImageUrl: string;
  PromotionCardColor: string;
  RemainingText: string;
  SeoName: string;
  Title: string;
  ScenarioType: string;
  Unavailable: boolean;
  Unvisible: boolean;
  ListButtonText: string;
  ListButtonTextBackGroudColor: string;
  CardType: string;
  ExternalUrl: string | null;
  ExternalType: string | null;
  ExternalRedirectType: string | null;
  ExternalWebviewType: string | null;
  ExternalLoginGate: string | null;
  IsLuckyDay: boolean;
  LuckyDayText: string;
  LuckyDayTextColor: string | null;
  LuckyDayBackgroundColor: string | null;
}

export type PromotionsResponse = Promotions[];

// PromotionDetailItem interface
export interface PromotionDetailItem {
  Title: string;
  Description: string;
  ImageUrl: string;
}

// PromotionDetailArea interface
export interface PromotionDetailArea {
  Title: string;
  Description: string;
  OpenedIconUrl: string;
  ClosedIconUrl: string;
  UseMapButton: boolean;
  PromotionDetailItems: PromotionDetailItem[];
}

// PromotionGallery interface
export interface PromotionGallery {
  DocumentUrl: string;
  DocumentType: string;
  CoverImageUrl: string;
}


export interface PromotionResponse {
  BrandIconColor: string;
  BrandIconUrl: string;
  BrandPromotionCardParticipationText: string;
  Description: string;
  EndDate: string;
  Id: number;
  ImageUrl: string;
  CountryTimeZone: number;
  RemainingText: string;
  StartDate: string;
  Title: string;
  Type: string;
  CardType: string;
  ScenarioType: string;
  SeoName: string;
  Unavailable: boolean;
  IsMapAvailable: boolean;
  Unvisible: boolean;
  DetailButtonText: string;
  ListButtonText: string | null;
  LuckyDayText: string;
  LuckyDayTextColor: string;
  LuckyDayBackgroundColor: string;
  ExternalUrl: string | null;
  ExternalType: string | null;
  ExternalRedirectType: string | null;
  ExternalWebviewType: string | null;
  ExternalLoginGate: string | null;
  PromotionDetailItemAreas: PromotionDetailArea[];
  Contents: any[];
  PromotionTags: string[];
  PromotionGalleries: PromotionGallery[];
  NextFlowConfigurations: Record<string, unknown>;
  GameWin: any | null;
}
