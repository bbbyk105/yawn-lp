import { Metadata } from "next";
import { getBlogPosts } from "@/lib/microcms";
import BlogSection from "@/components/blog/BlogSection";

export const metadata: Metadata = {
  title: "ホーム | あなたのサイト名",
  description: "家具、照明、インテリアのドロップシッピングサイト",
};

export const revalidate = 60;

export default async function HomePage() {
  const { contents: blogPosts } = await getBlogPosts({ limit: 4 });

  return (
    <main className="bg-white min-h-screen">
      {/* ブログセクション */}
      <BlogSection posts={blogPosts} />

      {/* 他のセクション */}
    </main>
  );
}
