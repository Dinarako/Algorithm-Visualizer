import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-center py-8 border-t border-border/50 mt-12">
      <p className="text-sm text-muted-foreground mb-2">
        Built with React.js as a sorting algorithm visualizer project
      </p>
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="text-muted-foreground">Created by</span>
        <span className="font-semibold text-primary">Your Name</span>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:scale-110 transition-transform text-primary"
          aria-label="GitHub Portfolio"
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
