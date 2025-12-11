export enum ThreadStyle {
  EmakEmakBestie = 'emak-emak_bestie',
  EdukasiExpert = 'edukasi_expert',
  Storytelling = 'storytelling',
  SocialProof = 'social_proof',
  FomoUrgency = 'fomo_urgency',
  BeforeAfter = 'before_after',
  ProblemSolution = 'problem_solution',
  InfluencerStyle = 'influencer_style',
}

export enum EmojiDensity {
  Minimal = 'minimal',
  Medium = 'medium',
  Banyak = 'banyak',
}

export enum CtaStyle {
  Soft = 'soft',
  Hard = 'hard',
}

export enum ThreadLength {
  Three = 3,
  Four = 4,
  Six = 6,
  Eight = 8,
}

export interface ThreadInputData {
  product_name: string;
  product_description: string;
  shopee_link: string;
  target_audience: string;
  price_range: string;
  style: ThreadStyle;
  length: ThreadLength;
  tone_level: number;
  emoji_density: EmojiDensity;
  cta_style: CtaStyle;
  include_price: boolean;
}

export interface GeneratedThreadResponse {
  content: string;
}
