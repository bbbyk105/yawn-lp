export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: {
    id: string;
    name: string;
  };
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  publishedAt: string;
  updatedAt: string;
  revisedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface MicroCMSResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
