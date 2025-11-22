import { createClient } from "microcms-js-sdk";
import type { BlogPost, MicroCMSResponse, Category } from "@/types/blog";

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

const BLOG_ENDPOINT = "blogs";
const CATEGORY_ENDPOINT = "categories";

export const getBlogPosts = async (params?: {
  limit?: number;
  offset?: number;
  categoryId?: string;
}): Promise<MicroCMSResponse<BlogPost>> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queries: Record<string, any> = {
      limit: params?.limit || 10,
      offset: params?.offset || 0,
    };

    if (params?.categoryId) {
      queries.filters = `category[equals]${params.categoryId}`;
    }

    const response = await client.get<MicroCMSResponse<BlogPost>>({
      endpoint: BLOG_ENDPOINT,
      queries,
    });

    return response;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

// ✅ 修正: 単一記事取得 - contentsIdではなくフィルターを使用
export const getBlogPost = async (id: string): Promise<BlogPost> => {
  try {
    // リスト形式のエンドポイントなので、フィルターで取得
    const response = await client.get<MicroCMSResponse<BlogPost>>({
      endpoint: BLOG_ENDPOINT,
      queries: {
        filters: `id[equals]${id}`,
        limit: 1,
      },
    });

    if (response.contents.length === 0) {
      throw new Error(`Blog post with id ${id} not found`);
    }

    return response.contents[0];
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
};

export const getCategories = async (): Promise<MicroCMSResponse<Category>> => {
  try {
    return await client.get<MicroCMSResponse<Category>>({
      endpoint: CATEGORY_ENDPOINT,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
