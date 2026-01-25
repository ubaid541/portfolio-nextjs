"use client";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Code2 } from "lucide-react";
// import { Button } from "./components/ui/button.tsx";
// import { Button } from "../components/ui/Button.tsx";
import { Button } from "../component/components/ui/Button";
import { cn } from "../utils";
import { Link as ScrollLink } from "react-scroll";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    // { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/80 backdrop-blur-md border-border/50 py-3" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Code2 className="w-6 h-6 text-primary" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">
            Ubaid<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {isHome ? (
            navLinks.map((link) => (
              <ScrollLink
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {link.name}
              </ScrollLink>
            ))
          ) : (
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Back to Home
            </Link>
          )}
          
          <div className="h-4 w-px bg-border mx-2"></div>
          
          {/* <Link href="/blog">
            <Button variant="ghost" className="text-sm font-medium">
              Blog
            </Button>
          </Link> */}
          
          <Button 
            className="rounded-full px-6 bg-white text-black hover:bg-gray-200"
            onClick={() => window.open("/ubaid_ur_rehman_resume.pdf", "_blank")}
          >
            Resume
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {isHome ? (
              navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-muted-foreground hover:text-primary py-2 cursor-pointer border-b border-border/50 last:border-0"
                >
                  {link.name}
                </ScrollLink>
              ))
            ) : (
              <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-primary py-2 border-b border-border/50">
                Home
              </Link>
            )}
            {/* <Link href="/blog" onClick={() => setIsOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-primary py-2 border-b border-border/50">
              Blog
            </Link> */}
            <Button className="w-full mt-2" onClick={() => window.open("/resume.pdf", "_blank")}>
              Download Resume
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
