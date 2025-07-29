import Navbar from "../components/Navbar";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Careers from "../components/Careers";
import Blog from "../components/Blog";
import Services from "../components/Service";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Blog />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
