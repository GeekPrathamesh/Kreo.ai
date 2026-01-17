import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Coins, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Create Video", href: "/create" },
  { name: "Community", href: "/community" },
  { name: "Generated Videos", href: "/generations" },
  { name: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
   isScrolled || isMobileMenuOpen
  ? "backdrop-blur-lg bg-background/70 py-3"
  : "bg-transparent py-5"
  }`}
>

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/" onClick={()=>scrollTo(0,0)}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl font-bold text-foreground tracking-tight group-hover:text-glow transition-all duration-300">
              ugc<span className="text-glow-accent">.ai</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  location.pathname === link.href
                    ? "text-foreground bg-secondary/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {/* Credits */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50">
                  <Coins className="w-4 h-4 text-glow-accent" />
                  <span className="text-sm font-medium">{user.credits}</span>
                </div>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-glow flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 glass-strong">
                    <DropdownMenuItem onClick={() => navigate("/generations")}>My Generations</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/community")}>Community</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/account")}>Balance / Credits</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/account")}>Manage Account</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => { signOut(); navigate("/"); }}>Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button variant="glow" size="default" onClick={() => navigate("/auth")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border/50 pt-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                    location.pathname === link.href
                      ? "text-foreground bg-secondary/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
                  <Button variant="ghost" className="justify-start" onClick={() => { navigate("/auth"); setIsMobileMenuOpen(false); }}>
                    Sign In
                  </Button>
                  <Button variant="glow" onClick={() => { navigate("/auth"); setIsMobileMenuOpen(false); }}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
