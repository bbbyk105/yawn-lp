import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  if (posts.length === 0) return null;

  const [featuredPost, ...otherPosts] = posts;

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-white">
      {/* Featured Label */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-red-600 tracking-tight">
          Featured
        </h2>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <Link href={`/blog/${featuredPost.id}`} className="block mb-16 group">
          <article>
            {/* Date & Category */}
            <div className="flex items-center gap-3 mb-4">
              {featuredPost.publishedAt && (
                <time className="text-sm text-gray-500 font-medium">
                  {formatDate(featuredPost.publishedAt)}
                </time>
              )}
              {featuredPost.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
                  {featuredPost.category.name}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 group-hover:text-gray-600 transition-colors leading-tight">
              {featuredPost.title}
            </h3>

            {/* Read More Link */}
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-8 group-hover:text-gray-900 transition-colors">
              <span className="border-b-2 border-red-600 pb-1">詳しく見る</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            {/* Thumbnail */}
            {featuredPost.thumbnail?.url && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                <Image
                  src={featuredPost.thumbnail.url}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            )}
          </article>
        </Link>
      )}

      {/* Other Posts Grid */}
      {otherPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group">
              <article className="h-full flex flex-col">
                {/* Thumbnail */}
                {post.thumbnail?.url && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 shadow-sm">
                    <Image
                      src={post.thumbnail.url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  {/* Category & Date */}
                  <div className="flex items-center gap-2 mb-3">
                    {post.category && (
                      <span className="text-xs px-2.5 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
                        {post.category.name}
                      </span>
                    )}
                    {post.publishedAt && (
                      <time className="text-xs text-gray-500">
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2 mb-2 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* View All Link */}
      <div className="mt-16 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-gray-900 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-200 shadow-sm"
        >
          すべての記事を見る
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
