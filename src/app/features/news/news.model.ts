export const DATE_FORMAT = "MMM dd, yyyy, hh:mm a";

export interface NewsItemPreview {
  id: string;
  title: string;
  originalUrl: string;
  publishedAt: string; // ISO
}

export interface NewsItem extends NewsItemPreview {
  author?: string;
  lang: string;
  text: string;
  translatedText: string;
}
