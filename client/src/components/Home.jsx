
import AboutPage from "../Page/AboutPage";
import NewsLetter from "../components/NewsLetter"
import Footer from "../components/Footer";
import BlogPage from "../Page/BlogPage";
import Hero from "../components/Hero";
import PackagesPage from "../Page/PackagePage";

const Home = () => {
  return (
    <>
     <Hero />
     <PackagesPage />
     <BlogPage />
     <AboutPage />
     <NewsLetter />
     <Footer />
    </>
 
  );
};

export default Home;
