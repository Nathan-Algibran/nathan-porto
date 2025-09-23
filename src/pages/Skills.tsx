import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

const SkillsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <Skills />
      </div>
      <Footer />
    </div>
  );
};

export default SkillsPage;