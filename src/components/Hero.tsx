import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import profileAvatar from "@/assets/profile-avatar.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigateToProjects = () => {
    navigate("/projects");
  };

  const handleNavigateToContact = () => {
    navigate("/contact");
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary rounded-full animate-float opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
              Hi, I'm{" "}
              <span className="gradient-text">
                Nathan Algibran
              </span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 lg:mb-6">
              Full Stack Web Developer
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0">
              Passionate about creating beautiful, functional, and user-friendly applications. 
              I specialize in React, Node.js, Laravel and modern web technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                onClick={handleNavigateToProjects}
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect animate-pulse-glow w-full sm:w-auto"
                size="lg"
              >
                View My Work
              </Button>
              <Button
                onClick={handleNavigateToContact}
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-soft w-full sm:w-auto"
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative animate-float">
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary glow-effect">
                <img
                  src={profileAvatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative rings */}
              <div className="absolute -inset-4 border-2 border-primary/30 rounded-full animate-pulse hidden sm:block"></div>
              <div className="absolute -inset-8 border border-primary/20 rounded-full animate-pulse hidden lg:block" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;