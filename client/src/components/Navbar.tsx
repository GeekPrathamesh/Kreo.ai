import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Coins,
  User,
  ChevronDown,
  Folder,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Create Video", href: "/create" },
  { name: "Community", href: "/community" },
  { name: "Generated Videos", href: "/generations" },
  { name: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [credits, setcredits] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const pathname = location.pathname;
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getUsercredits = async () => {
    try {
      const { data } = await api.get("/api/user/credits");
      setcredits(data.credits);
    } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      (async () => await getUsercredits())();
    }
  }, [user, pathname]);

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
            to="/"
            onClick={() => scrollTo(0, 0)}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl font-bold text-foreground tracking-tight group-hover:text-glow transition-all duration-300">
              Kreo<span className="text-glow-accent">.ai</span>
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
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Credits */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50">
                  <Coins className="w-4 h-4 text-glow-accent" />
                  <span className="text-sm font-medium">credits : {credits ? credits : 0}</span>
                </div>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 glass-strong border-white/10" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none text-slate-200">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuItem onClick={() => navigate("/generations")} className="cursor-pointer">
                      <Folder className="mr-2 h-4 w-4" />
                      <span>My Generations</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/community")} className="cursor-pointer">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Community</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/account")} className="cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Balance / Credits</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/account")} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Manage Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500">
                      <X className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/auth")}
                  className="hidden lg:flex rounded-xl px-5 py-2.5 
             bg-white text-black font-medium 
             shadow-md hover:shadow-lg 
             transition-all duration-300"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          {!user && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          )}
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
                <div className="flex flex-col gap-2   border-t border-border/50">
                  <Button
                    onClick={() => {
                      navigate("/auth");
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start rounded-lg bg-white text-black shadow"
                  >
                    Sign In
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
