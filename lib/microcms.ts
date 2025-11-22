import { createClient } from "microcms-js-sdk";
import type { BlogPost, MicroCMSResponse } from "@/types/blog";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ✅ エンドポイントを 'blogs' に修正
const BLOG_ENDPOINT = "blogs";
const CATEGORY_ENDPOINT = "categories";

export const getBlogPosts = async (params?: {
  limit?: number;
  offset?: number;
  categoryId?: string;
}): Promise<MicroCMSResponse<BlogPost>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queries: Record<string, any> = {
    limit: params?.limit || 10,
    offset: params?.offset || 0,
  };

  if (params?.categoryId) {
    queries.filters = `category[equals]${params.categoryId}`;
  }

  return await client.get<MicroCMSResponse<BlogPost>>({
    endpoint: BLOG_ENDPOINT,
    queries,
  });
};

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  return await client.get<BlogPost>({
    endpoint: BLOG_ENDPOINT,
    contentId: slug,
  });
};

export const getCategories = async () => {
  return await client.get({
    endpoint: CATEGORY_ENDPOINT,
  });
};
