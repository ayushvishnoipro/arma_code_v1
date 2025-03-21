
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-semibold text-sm">CE</span>
          </div>
          <span className="font-display font-semibold text-lg">CollegeElect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
          <Link to="/elections" className={`nav-link ${isActive("/elections") ? "active" : ""}`}>
            Elections
          </Link>
          <Link to="/candidates" className={`nav-link ${isActive("/candidates") ? "active" : ""}`}>
            Candidates
          </Link>
          <Link to="/results" className={`nav-link ${isActive("/results") ? "active" : ""}`}>
            Results
          </Link>
          <div className="pl-2">
            <ThemeToggle />
          </div>
          <div className="pl-2 flex space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/login?signup=true">Sign Up</Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="ml-1" title="Admin Login">
              <Link to="/admin">
                <UserCog className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="h-9 w-9"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t animate-slide-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className={`px-2 py-2 rounded-md ${
                isActive("/") ? "bg-muted font-medium" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/elections"
              className={`px-2 py-2 rounded-md ${
                isActive("/elections") ? "bg-muted font-medium" : ""
              }`}
            >
              Elections
            </Link>
            <Link
              to="/candidates"
              className={`px-2 py-2 rounded-md ${
                isActive("/candidates") ? "bg-muted font-medium" : ""
              }`}
            >
              Candidates
            </Link>
            <Link
              to="/results"
              className={`px-2 py-2 rounded-md ${
                isActive("/results") ? "bg-muted font-medium" : ""
              }`}
            >
              Results
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" asChild className="w-full justify-center">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild className="w-full justify-center">
                <Link to="/login?signup=true">Sign Up</Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-between">
                <Link to="/admin">
                  <span>Admin Login</span>
                  <UserCog className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
