
import AboutPage from "../Page/AboutPage";
import NewsLetter from "../components/NewsLetter"
import Footer from "../components/Footer";
import BlogPage from "../Page/BlogPage";
import Hero from "../components/Hero";
import PackagesPage from "../Page/PackagePage";
import International_pack from "./InternationalPack";

const Home = () => {
  return (
    <>
     <Hero />
     <PackagesPage />
     <International_pack />
     <BlogPage />
     <AboutPage />
     <NewsLetter />
     <Footer />
    </>
 
  );
};

export default Home;
