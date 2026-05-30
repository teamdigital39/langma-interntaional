import API_BASE from "../../config.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

const API_URL = `${API_BASE}/api/blog-list`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);

        setBlogs(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <section className="relative w-full overflow-hidden bg-[#F7FAFC] mx-auto">
       <div className="w-full  grid grid-cols-1 h-[130px] md:h-[300px] lg:h-[400px] xl:h-[600px]">
  <div
    className="relative w-full"
    style={{
      backgroundImage: "url('/images/blg.png')", 
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
  </div>
</div>

      </section>
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      
      <h2 className="text-2xl font-bold mb-6">Blogs</h2>

      
      {loading && <p>Loading blogs...</p>}

      {!loading && blogs.length === 0 && (
        <p>No blogs found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-lg p-5"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <div className="flex items-center gap-2 text-sm text-[#FC6441] mb-2">
              <CalendarDays size={14} />
              Latest
            </div>

          <h3 className="font-semibold text-[#0F2A44] mb-4">
  {blog.title}
</h3>

            <Link to={`/blog-detail/${blog.slug}`}>
              <button className="bg-[#2FC7A1] text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer">
                Read More
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default BlogPage;