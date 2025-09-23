import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  // Mock project data - in real app, this would come from your database
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with user authentication, shopping cart, payment integration, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      githubUrl: "https://github.com/username/ecommerce",
      liveUrl: "https://ecommerce-demo.com",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration, and project tracking.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      technologies: ["Vue.js", "Express", "MongoDB", "Socket.io"],
      githubUrl: "https://github.com/username/taskmanager",
      liveUrl: "https://taskmanager-demo.com",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasts, interactive maps, and weather alerts.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      technologies: ["React", "TypeScript", "Weather API", "Chart.js"],
      githubUrl: "https://github.com/username/weather",
      liveUrl: "https://weather-demo.com",
      featured: false
    },
    {
      id: 4,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with data visualization and engagement tracking.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      technologies: ["Next.js", "GraphQL", "PostgreSQL", "D3.js"],
      githubUrl: "https://github.com/username/social-dashboard",
      liveUrl: "https://social-demo.com",
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 group hover:glow-soft overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {project.featured && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="outline"
                      className="border-primary/40 text-primary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                    Code
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground glow-soft"
                  asChild
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-soft"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;