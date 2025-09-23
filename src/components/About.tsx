import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "7+", label: "Projects Completed" },
    { number: "10+", label: "Happy Clients" },
    { number: "100%", label: "Client Satisfaction" }
  ];

  return (
    <section id="about" className="py-20 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate web developer with expertise in modern technologies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6">
              Crafting Digital Experiences
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a passionate full-stack developer with over 3 years of experience in creating 
                web applications that combine beautiful design with robust functionality.
              </p>
              <p>
                My journey started with curiosity about how websites work, and it has evolved into 
                a deep passion for creating digital solutions that make a real impact.
              </p>
              <p>
                I believe in writing clean, maintainable code and staying up-to-date with the latest 
                technologies and best practices in web development.
              </p>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">What I Do</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Frontend Development (React, TypeScript, Tailwind CSS)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Backend Development (Node.js, Express, Database Design, Laravel)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  UI/UX Design & Responsive Web Design
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  API Development & Third-party Integrations
                </li>
              </ul>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 group hover:glow-soft"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold gradient-text mb-2 group-hover:animate-pulse">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;