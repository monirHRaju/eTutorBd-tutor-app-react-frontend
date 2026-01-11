import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import SectionHeader from "../Shared/SectionHeader";

const blogs = [
  {
    id: 1,
    title: "Importance of Reading Books And How To Build Interest In Kids",
    desc:
      "There are practical ways to enhance memory through reading habits, storytelling and engaging activities.",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350",
    featured: true,
  },
  {
    id: 2,
    title: "Quick Exercise To Boost Focus And Memory In Kids",
    desc:
      "Improve concentration using memory exercises, physical activities and calming practices.",
    image:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c",
  },
  {
    id: 3,
    title: "Craft That Teach And Entertain At The Same Time",
    desc:
      "Creative craft ideas that help kids learn while having fun.",
    image:
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52",
  },
];

const BlogSection = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <SectionHeader label="Blogs" title="Latest Blog And News" subtitle="Insights, tips and updates from our education experts" />

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Featured Blog */}
          <div className="lg:col-span-2 group">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={blogs[0].image}
                alt={blogs[0].title}
                className="w-full h-[360px] object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-base-content">
              {blogs[0].title}
            </h3>
            <p className="mt-3 text-base-content/70 max-w-2xl">
              {blogs[0].desc}
            </p>

            <button className="mt-5 inline-flex items-center gap-2 text-secondary font-medium hover:gap-3 transition">
              Learn More
              <span className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                <FaArrowUpRightFromSquare size={14} />
              </span>
            </button>
          </div>

          {/* Side Blogs */}
          <div className="space-y-10">
            {blogs.slice(1).map((blog) => (
              <div key={blog.id} className="group flex gap-5">
                
                {/* Image */}
                <div className="w-40 h-28 overflow-hidden rounded-2xl flex-shrink-0">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div>
                  <h4 className="font-semibold text-lg text-base-content leading-snug">
                    {blog.title}
                  </h4>
                  <p className="mt-2 text-sm text-base-content/70">
                    {blog.desc}
                  </p>

                  <button className="mt-3 inline-flex items-center gap-2 text-secondary text-sm font-medium">
                    Learn More
                    <FaArrowUpRightFromSquare />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSection;
