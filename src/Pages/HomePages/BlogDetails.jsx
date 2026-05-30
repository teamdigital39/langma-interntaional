import API_BASE from "../../config.js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/api/blog-detail/${encodeURIComponent(slug)}`
        );
        const result = await response.json();

        setBlog(result.data);
        setRecentBlogs(result.recentBlog || []);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlogDetail();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog not found
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div
        className="w-full h-72 md:h-[400px] flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${blog.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative text-white text-3xl md:text-4xl font-bold pl-4">
          {blog.title}
        </h1>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT CONTENT */}
          <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow">

            {/* <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-80 object-cover rounded-lg mb-6"
            />

           
            <h1 className="text-2xl font-bold mb-4">
              {blog.title}
            </h1> */}

            
            <div
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:w-1/3">

            {/* Search */}
            {/* <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search Latest Blogs"
                className="w-full border rounded-lg py-3 px-4 pr-10"
              />
              <Search className="absolute right-3 top-3 text-gray-400" size={18} />
            </div> */}

            {/* Recent Blogs */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-lg font-bold mb-4">Recent Blogs</h3>

              <div className="space-y-4">
                {recentBlogs.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <a
                      href={`/newuilangma/blog-detail/${item.slug}`}
                      className="text-sm font-medium hover:text-[#FC6441] line-clamp-2"
                    >
                      {item.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics */}
            {/* <div className="bg-[#FFF5F5] p-6 rounded-xl mt-6">
              <h3 className="text-lg font-bold mb-4">Related Topics</h3>
              <ul className="space-y-3">
                {["IELTS Prep", "Corporate Training", "Study Abroad"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-gray-600 hover:text-pink-600 cursor-pointer"
                  >
                    <ChevronRight size={16} /> {item}
                  </li>
                ))}
              </ul>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;