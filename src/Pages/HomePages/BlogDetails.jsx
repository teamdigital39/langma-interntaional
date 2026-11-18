import API_BASE from "../../config.js";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import {
  BLOG_CONTENT_SLUG_ALIASES,
  LEGACY_BLOG_SLUG_REDIRECTS,
} from "../../legacyRouteRedirects.js";
import {
  getLocalBlogFallback,
  getBlogArticlePath,
  getBlogPublicSlug,
} from "../../blogFallbacks.js";
import {
  formatJpExamBlogContent,
  JLPT_NAT_TEST_BLOG_SLUG,
} from "../../blogContentFormatting.js";
import "./BlogUI.css";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const contentSlug = BLOG_CONTENT_SLUG_ALIASES[slug] || slug;
  const localFallback = getLocalBlogFallback(slug);
  const isJlptNatTestArticle =
    getBlogPublicSlug(slug) === JLPT_NAT_TEST_BLOG_SLUG;
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        if (localFallback) {
          const response = await fetch(localFallback.contentUrl);
          if (!response.ok) throw new Error(`Local blog content request failed (${response.status})`);
          setBlog({ ...localFallback, content: await response.text() });
          try {
            const recentResponse = await fetch(`${API_BASE}/api/home`);
            if (recentResponse.ok) {
              const recent = await recentResponse.json();
              setRecentBlogs((recent.blogs || []).filter(item => item.id !== 107));
            }
          } catch {
            // Optional recent articles must not prevent the fallback rendering.
          }
          return;
        }
        const response = await fetch(
          `${API_BASE}/api/blog-detail/${encodeURIComponent(contentSlug)}`
        );
        if (!response.ok) {
          setUnavailable(true);
          return;
        }

        const result = await response.json();
        if (!result?.data) {
          setUnavailable(true);
          return;
        }

        setBlog(
          isJlptNatTestArticle
            ? {
                ...result.data,
                content: formatJpExamBlogContent(result.data.content),
              }
            : result.data
        );
        setRecentBlogs(result.recentBlog || []);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setUnavailable(true);
      } finally {
        setLoading(false);
      }
    };

    if (contentSlug) fetchBlogDetail();
  }, [contentSlug, isJlptNatTestArticle, localFallback]);

  const canonicalSlug = LEGACY_BLOG_SLUG_REDIRECTS[slug];
  if (canonicalSlug) {
    return <Navigate to={`/blog/${canonicalSlug}`} replace />;
  }

  if (unavailable) {
    return <Navigate to="/blog/" replace />;
  }

  if (loading) {
    return (
      <main className="langma-blog-ui min-h-screen bg-[#F6FAF9] px-5 py-20">
        <div
          className="mx-auto max-w-4xl animate-pulse space-y-5"
          aria-label="Loading article"
          aria-busy="true"
        >
          <div className="h-6 w-32 rounded-full bg-slate-200" />
          <div className="h-14 max-w-3xl rounded-xl bg-slate-200" />
          <div className="h-96 rounded-3xl bg-slate-200" />
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="langma-blog-ui flex min-h-[60vh] flex-col items-center justify-center bg-[#F6FAF9] px-5 text-center">
        <BookOpen size={36} className="text-[#16826B]" aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-extrabold text-[#0F2A44]">
          Article not found
        </h1>
        <p className="mt-3 max-w-md text-slate-600">
          This article may have moved. Browse the latest insights to find more
          guidance from Langma.
        </p>
        <Link
          to="/blog/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#16826B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#116b59]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Browse all articles
        </Link>
      </main>
    );
  }

  return (
    <main className="langma-blog-ui blog-detail-ui min-h-screen bg-[#F6FAF9] text-[#0F2A44]">
      <section className="relative isolate overflow-hidden bg-[#0F2A44]">
        {blog.image && (
          <img
            src={blog.image}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-35"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071A2F]/95 via-[#0F2A44]/85 to-[#0F2A44]/65" />
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-28 sm:px-8 md:pb-16 md:pt-36">
          <nav
            aria-label="Breadcrumb"
            className="mb-7 flex items-center gap-2 text-sm font-medium text-white/70"
          >
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight size={15} aria-hidden="true" />
            <Link to="/blog/" className="transition hover:text-white">
              Insights
            </Link>
            <ChevronRight size={15} aria-hidden="true" />
            <span className="max-w-[12rem] truncate text-white sm:max-w-sm">
              Article
            </span>
          </nav>
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#7DE0C4]">
              Langma insights
            </p>
            <h1
              className={`blog-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl${
                isJlptNatTestArticle ? " blog-heading-compact" : ""
              }`}
            >
              {blog.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              Practical ideas and guidance to help you plan your next step with
              confidence.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 md:py-14">
        <div className="mb-7">
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#16826B] transition hover:text-[#0F2A44]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All articles
          </Link>
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
          <article className="min-w-0 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_42px_rgba(15,42,68,0.07)]">
            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 sm:px-9">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F8F3] text-[#16826B]">
                <BookOpen size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-[#0F2A44]">
                  Langma International
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Insights &amp; guidance
                </p>
              </div>
            </div>
            <div
              className="blog-article-content px-6 py-7 sm:px-9 sm:py-10"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          <aside className="lg:sticky lg:top-28">
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_12px_42px_rgba(15,42,68,0.07)] sm:p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#16826B]">
                Keep exploring
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0F2A44]">
                Recent articles
              </h2>
              {recentBlogs.length > 0 ? (
                <ul className="mt-6 divide-y divide-slate-100">
                  {recentBlogs.slice(0, 5).map((item, index) => {
                    const itemSlug =
                      LEGACY_BLOG_SLUG_REDIRECTS[item.slug] || item.slug;
                    return (
                      <li key={item.id || item.slug || index} className="py-4 first:pt-0 last:pb-0">
                        <Link
                          to={getBlogArticlePath(itemSlug)}
                          className="group flex items-start gap-3"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt=""
                              loading="lazy"
                              className="h-16 w-16 shrink-0 rounded-xl object-cover"
                            />
                          )}
                          <span className="text-sm font-bold leading-5 text-[#0F2A44] transition group-hover:text-[#16826B]">
                            {item.title}
                            <span className="mt-2 flex items-center gap-1 text-xs font-bold text-[#16826B]">
                              Read article
                              <ArrowRight
                                size={13}
                                aria-hidden="true"
                                className="transition-transform group-hover:translate-x-1"
                              />
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Browse all our language, study and career guidance in one
                  place.
                </p>
              )}
              <Link
                to="/blog/"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#16826B]/25 px-4 py-3 text-sm font-extrabold text-[#16826B] transition hover:border-[#16826B] hover:bg-[#E8F8F3]"
              >
                Explore all insights
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default BlogDetailPage;
