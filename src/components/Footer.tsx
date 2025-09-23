import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/yourusername",
      label: "GitHub"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com/yourusername",
      label: "Twitter"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:your.email@example.com",
      label: "Email"
    }
  ];

  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold gradient-text mb-2">
              Portfolio
            </div>
            <p className="text-muted-foreground text-sm">
              Building digital experiences with passion and precision
            </p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10 glow-soft"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary/20 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Nathan-Algibran. All rights reserved. Built with ❤️ using React & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;