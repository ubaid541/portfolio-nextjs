import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-heading font-bold text-xl mb-2">Ubaid Ur Rehman</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Building scalable digital experiences with React, Node.js, and modern web technologies.
            </p>
          </div>

          <div className="flex gap-6">
            <a 
              href="https://github.com/ubaid541" 
              target="_blank" 
              rel="noreferrer"
              className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-all hover:-translate-y-1"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/ubaid-ur-rehman-se" 
              target="_blank" 
              rel="noreferrer"
              className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-all hover:-translate-y-1"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:ubaidrehmanse@gmail.com" 
              className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-all hover:-translate-y-1"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} Ubaid Ur Rehman. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed & Built with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
