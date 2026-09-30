import API_BASE from "../../config.js";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock3, Search, Tag, X } from "lucide-react";
import "./BlogUI.css";

const API_URL = `${API_BASE}/api/blog-list`;

const stripHtml = (value = "") => value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

const getExcerpt = (blog) => {
  const source = blog.excerpt || blog.description || stripHtml(blog.content || "");
  return source.length > 150 ? `${source.slice(0, 147).trim()}…` : source || "Practical insights on languages, study abroad, careers and global mobility.";
};

const getDateLabel = (blog) => {
  const rawDate = blog.published_at || blog.publishedAt || blog.created_at || blog.createdAt || blog.date;
  if (!rawDate) return "Latest";
  const date = new Date(rawDate);
  return Number.isNaN(date.getTime()) ? "Latest" : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const getCategory = (blog) => blog.category || blog.category_name || blog.categoryName || "Global Learning";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBlogs(Array.isArray(data) ? data : data.data || []))
      .catch((err) => console.error("BLOG API ERROR:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => ["All", ...new Set(blogs.map(getCategory))], [blogs]);

  const filteredBlogs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesCategory = category === "All" || getCategory(blog) === category;
      const searchable = `${blog.title || ""} ${getExcerpt(blog)} ${getCategory(blog)}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [blogs, category, query]);

  return (
    <main className="langma-blog-ui min-h-screen bg-[#F6FAF9] text-[#0F2A44]">
      <section className="relative isolate overflow-hidden bg-[#0F2A44]">
        <img src="/images/blg.png" alt="Langma International insights and global learning" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071A2F]/95 via-[#0F2A44]/80 to-[#0F2A44]/45" />
        <div className="mx-auto flex min-h-[280px] max-w-7xl items-end px-5 pb-12 pt-28 sm:px-8 md:min-h-[360px] md:pb-16">
          <div className="max-w-2xl text-white">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#7DE0C4]">Langma insights</p>
            <h1 className="blog-heading font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">Ideas for your next global move.</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Explore practical guidance on language learning, exams, study abroad, overseas careers and international mobility.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-14">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[#2A9D82]">Latest articles</p>
            <h2 className="blog-heading text-3xl font-extrabold tracking-tight text-[#0F2A44] sm:text-4xl">Guidance that moves you forward.</h2>
            {!loading && <p className="mt-2 text-sm text-slate-500">Showing {filteredBlogs.length} of {blogs.length} articles</p>}
          </div>
          <div className="relative w-full max-w-md">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" aria-label="Search articles" className="h-12 w-full rounded-full border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-700 outline-none transition focus:border-[#2FC7A1] focus:ring-4 focus:ring-[#2FC7A1]/15" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={16} /></button>}
          </div>
        </div>

        {!loading && categories.length > 1 && (
          <div className="mb-9 flex gap-2 overflow-x-auto pb-2" aria-label="Blog categories">
            {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${category === item ? "border-[#2FC7A1] bg-[#2FC7A1] text-white shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-[#2FC7A1] hover:text-[#16826B]"}`}>{item}</button>)}
          </div>
        )}

        {loading && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><div className="h-96 animate-pulse rounded-2xl bg-slate-200" /><div className="h-96 animate-pulse rounded-2xl bg-slate-200" /><div className="hidden h-96 animate-pulse rounded-2xl bg-slate-200 lg:block" /></div>}

        {!loading && filteredBlogs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><h3 className="text-xl font-bold">No articles match your search.</h3><p className="mt-2 text-sm text-slate-500">Try another keyword or clear the selected filters.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="mt-5 rounded-full bg-[#2FC7A1] px-5 py-2.5 text-sm font-bold text-white">Clear filters</button></div>
        )}

        {!loading && filteredBlogs.length > 0 && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => <article key={blog.id || blog.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(15,42,68,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(15,42,68,0.13)]">
            <Link to={`/blog-detail/${blog.slug}/`} className="relative block aspect-[16/9] overflow-hidden bg-slate-100">
              <img src={blog.image} alt={blog.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#16826B] shadow-sm"><Tag size={12} />{getCategory(blog)}</span>
            </Link>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-400"><span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-[#FC6441]" />{getDateLabel(blog)}</span><span className="inline-flex items-center gap-1.5"><Clock3 size={14} className="text-[#2FC7A1]" />5 min read</span></div>
              <h3 className="mt-4 line-clamp-2 text-xl font-extrabold leading-snug text-[#0F2A44] transition group-hover:text-[#16826B]"><Link to={`/blog-detail/${blog.slug}/`}>{blog.title}</Link></h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{getExcerpt(blog)}</p>
              <Link to={`/blog-detail/${blog.slug}/`} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#16826B]">Read article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
            </div>
          </article>)}
        </div>}
      </section>
    </main>
  );
}

export default BlogPage;
