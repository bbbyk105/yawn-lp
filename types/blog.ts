export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface RichEditorContent {
  html: string;
  text?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string | RichEditorContent;
  excerpt?: string; // オプショナルに変更
  thumbnail?: {
    url: string;
    width?: number;
    height?: number;
  };
  category?: Category; // オプショナルに変更
  publishedAt?: string; // オプショナルに変更
  createdAt: string;
  updatedAt: string;
  revisedAt: string;
}

export interface MicroCMSResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
