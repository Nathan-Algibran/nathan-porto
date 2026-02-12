import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "",
      skills: [
        { name: "React", level: 95 },
        { name: "laravel", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Next.js", level: 85 },
        { name: "Vue.js", level: 75 },
      ]
    },
    {
      title: "Backend",
      icon: "",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express", level: 88 },
        { name: "MySQL", level: 87 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "GraphQL", level: 75 },
      ]
    },
    {
      title: "Tools & Others",
      icon: "",
      skills: [
        { name: "Git & GitHub", level: 95 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Jest", level: 85 },
        { name: "Figma", level: 90 },
      ]
    }
  ];

  const technologies = [
    "JavaScript", "TypeScript", "React", "Node.js", "Express", "PostgreSQL", 
    "MongoDB", "Tailwind CSS", "Git", "Docker", "AWS", "Figma", "Next.js", "Vue.js", "Laravel", "MySQL", "Supabase"
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 group hover:glow-soft"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 ease-out glow-soft"
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${(index + skillIndex) * 0.1}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Tags */}
        <div className="text-center animate-fade-in">
          <h3 className="text-xl font-semibold mb-6">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:glow-soft"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;