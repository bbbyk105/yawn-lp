import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/microcms";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ブログ | あなたのサイト名",
  description: "最新のニュースとお知らせをお届けします",
};

export const revalidate = 60;

export default async function BlogListPage() {
  const { contents: posts } = await getBlogPosts({ limit: 20 });

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors mb-4"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            ホームに戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">ブログ</h1>
        </div>
      </header>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group">
              <article>
                {post.thumbnail?.url && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                    <Image
                      src={post.thumbnail.url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {post.category && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                        {post.category.name}
                      </span>
                    )}
                    {post.publishedAt && (
                      <time className="text-xs text-gray-500">
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                  </div>

                  <h2 className="font-bold text-lg text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
