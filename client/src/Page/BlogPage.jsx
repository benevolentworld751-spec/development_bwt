import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const blogsData = [
  {
    id: 1,
    title: "Exploring the Hidden Gems of Bali",
    date: "Oct 5, 2025",
    excerpt:
      "Discover secluded beaches, local markets, and authentic Balinese culture in this detailed guide.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
  {
    id: 2,
    title: "Top 10 European Cities for Food Lovers",
    date: "Sep 22, 2025",
    excerpt:
      "From Parisian pastries to Italian pasta, explore the cities where food is the main attraction.",
    image:
      "https://i0.wp.com/hungryoungwoman.com/wp-content/uploads/2019/01/Cinque-Terre.jpg?ssl=1",
    link: "#",
  },
  {
    id: 3,
    title: "Adventure Travel: Hiking the Andes",
    date: "Aug 30, 2025",
    excerpt:
      "Step-by-step guide to trekking the Andes with breathtaking views, tips, and safety advice.",
    image:
      "https://www.cabinzero.com/cdn/shop/articles/best-beautiful-countries-in-europe.jpg?v=1635156014",
    link: "#",
  },
  {
    id: 4,
    title: "Luxury Escapes: Maldives on a Budget",
    date: "Aug 15, 2025",
    excerpt:
      "Learn how to enjoy Maldives’ luxury resorts and beaches without breaking the bank.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
  {
    id: 5,
    title: "Exploring the Hidden Gems of Bali",
    date: "Oct 5, 2025",
    excerpt:
      "Discover secluded beaches, local markets, and authentic Balinese culture in this detailed guide.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
  {
    id: 6,
    title: "Top 10 European Cities for Food Lovers",
    date: "Sep 22, 2025",
    excerpt:
      "From Parisian pastries to Italian pasta, explore the cities where food is the main attraction.",
    image:
      "https://i0.wp.com/hungryoungwoman.com/wp-content/uploads/2019/01/Cinque-Terre.jpg?ssl=1",
    link: "#",
  },
];

const BlogPage = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Travel & Tour Blogs
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Read our latest articles, tips, and guides to make your travel
            experience unforgettable.
          </p>
        </div>

        {/* Grid layout: 2 rows × 3 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((blog, index) => (
            <motion.div
              key={blog.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                type: "spring",
              }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm text-gray-400">{blog.date}</p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  {blog.title}
                </h3>
                <p className="mt-2 text-gray-600 flex-1">{blog.excerpt}</p>
                <Link
                  to={blog.link}
                  className="mt-4 inline-block text-sky-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-md font-medium shadow"
          >
            View All Blogs
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
