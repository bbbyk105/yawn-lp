import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/lib/microcms";
import { formatDate } from "@/lib/utils";
import ShareButtons from "@/components/blog/ShareButtons";

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const post = await getBlogPost(id);

    return {
      title: `${post.title} | ブログ`,
      description: post.excerpt || post.title,
      openGraph: {
        title: post.title,
        description: post.excerpt || post.title,
        type: "article",
        publishedTime: post.publishedAt,
        images: post.thumbnail ? [post.thumbnail.url] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "記事が見つかりません",
    };
  }
}

export async function generateStaticParams() {
  try {
    const { contents: posts } = await getBlogPosts({ limit: 100 });
    return posts.map((post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  let post;

  try {
    post = await getBlogPost(id);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }

  const getContentHTML = () => {
    if (!post.content) return "";

    if (typeof post.content === "string") {
      return post.content;
    }

    if (typeof post.content === "object" && "html" in post.content) {
      return (post.content as { html: string }).html;
    }

    return "";
  };

  const contentHTML = getContentHTML();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b sticky top-0 z-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
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
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          {post.publishedAt && (
            <time className="text-sm text-gray-500">
              {formatDate(post.publishedAt)}
            </time>
          )}
          {post.category && (
            <span className="text-sm px-3 py-1 bg-red-50 text-red-600 rounded-full font-medium">
              {post.category.name}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          {post.title}
        </h1>

        {/* Share */}
        <div className="mb-8">
          <ShareButtons title={post.title} url={`/blog/${post.id}`} />
        </div>

        {/* Thumbnail */}
        {post.thumbnail?.url && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-gray-100">
            <Image
              src={post.thumbnail.url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <div className="text-xl text-gray-700 mb-10 pb-10 border-b">
            {post.excerpt}
          </div>
        )}

        {/* Content */}
        {contentHTML ? (
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:pb-3
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:my-6 prose-ol:my-6
              prose-li:text-gray-700
              prose-img:rounded-xl prose-img:my-8
              prose-figure:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:pl-6 prose-blockquote:italic
              prose-code:bg-red-50 prose-code:text-red-600 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: contentHTML }}
          />
        ) : (
          <p className="text-gray-500 text-center py-10">
            コンテンツがありません
          </p>
        )}

        {/* Bottom Share */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-600 mb-4">この記事をシェアする</p>
          <ShareButtons title={post.title} url={`/blog/${post.id}`} />
        </div>

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border rounded-full hover:bg-gray-50"
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
            記事一覧に戻る
          </Link>
        </div>
      </article>
    </main>
  );
}
