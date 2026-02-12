import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToPage = (page: string) => {
    navigate(`/${page}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="text-xl font-bold gradient-text cursor-pointer"
            onClick={() => navigate("/")}
          >
            Nathan Algibran
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["about", "skills", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => navigateToPage(section)}
                className="text-foreground hover:text-primary transition-colors capitalize relative group"
              >
                {section}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-soft"
              onClick={() => window.location.href = "/login"}
            >
              Login
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-soft"
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="text-primary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] glass-effect">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="text-xl font-bold gradient-text mb-8">
                  Portfolio
                </div>
                
                {/* Mobile Navigation */}
                <div className="flex flex-col space-y-4">
                  {["about", "skills", "projects", "contact"].map((section) => (
                    <button
                      key={section}
                      onClick={() => navigateToPage(section)}
                      className="text-left text-lg text-foreground hover:text-primary transition-colors capitalize py-2 border-b border-border/20"
                    >
                      {section}
                    </button>
                  ))}
                </div>

                {/* Mobile Buttons */}
                <div className="flex flex-col gap-3 mt-8">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-soft"
                    onClick={() => {
                      window.location.href = "/login";
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Admin
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground glow-soft"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Hire Me
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;