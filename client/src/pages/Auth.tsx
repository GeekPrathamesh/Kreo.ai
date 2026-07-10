import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock, User, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      navigate("/create");
    } catch (err) {
      console.error("Auth error:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background Decorative Blur Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#4f39f6]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#4f39f6]/10 rounded-full blur-[120px]" />

      {/* Header / Home link */}
      <header className="container mx-auto px-6 py-6 z-10 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group text-2xl font-bold text-foreground tracking-tight">
          Kreo<span className="text-glow-accent text-primary">.ai</span>
        </Link>
        <Button variant="ghost" className="gap-2 text-slate-400 hover:text-slate-200" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>
      </header>

      {/* Main Box Container */}
      <main className="flex-grow flex items-center justify-center px-6 py-12 z-10">
        <div className="w-full max-w-md glass-strong border border-white/10 p-8 rounded-3xl backdrop-blur-xl bg-white/[0.02] shadow-2xl relative">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-primary/10 p-3 rounded-2xl mb-4 border border-primary/20">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              {isLogin
                ? "Sign in to generate stunning AI product advertisements"
                : "Join Kreo.ai to start creating ecommerce videos"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Name</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 text-slate-200 focus-visible:ring-1 focus-visible:ring-primary/30"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 text-slate-200 focus-visible:ring-1 focus-visible:ring-primary/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 text-slate-200 focus-visible:ring-1 focus-visible:ring-primary/30"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={authLoading}
              className="w-full h-11 bg-primary hover:bg-primary/95 text-white font-medium rounded-xl shadow-lg shadow-primary/20 mt-4 transition-all"
            >
              {authLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail("");
                setPassword("");
                setName("");
              }}
              className="text-primary hover:underline font-medium ml-1 transition-all"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
