import { Button } from "@/components/ui/button";
import { Play, Sparkles, Mic, Video, Subtitles, Share2, CheckCircle2 } from "lucide-react";
import heroMockup from "@/assets/hero-mockup.png";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const features = [
  { icon: Sparkles, label: "AI Actors & Voices" },
  { icon: Video, label: "Instant UGC Ad Scripts" },
  { icon: Play, label: "Vertical & Horizontal Formats" },
  { icon: Subtitles, label: "Auto Subtitles" },
  { icon: Share2, label: "One-Click Publishing" },
];

export function HeroSection() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  
  const handleStart = () => {
    if (isSignedIn) {
      navigate("/create");
    } else {
      openSignIn({
        afterSignInUrl: "/create",
        afterSignUpUrl: "/create",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-dark opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-glow-accent/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-glow-purple/5 rounded-full blur-[140px]" />

      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="flex flex-col space-y-10">
            <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-glow-accent" />
              <span className="text-[12px] font-semibold tracking-wide uppercase text-neutral-400">
                Trusted by 10,000+ top creators
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-5xl xl:text-5xl font-bold leading-[1.05] tracking-tight text-white">
                Create High-Converting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-accent to-glow-purple">
                  UGC Ads
                </span>{" "}
                with AI
              </h1>

              <p className="text-lg sm:text-xl text-neutral-400 max-w-lg leading-relaxed">
                Turn your product into scroll-stopping video ads without actors, cameras, or studios. Professionally edited in seconds.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={handleStart}
                className="bg-white text-black hover:bg-neutral-200 transition-all font-bold px-8 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Generating Free
              </Button>

              <Button 
                variant="outline" 
                size="xl" 
                onClick={() => navigate("/generations")}
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all"
              >
                <Play className="w-5 h-5 mr-2" />
                View Demos
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/20 border border-white/5 text-[13px] text-neutral-400 hover:border-white/20 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-glow-accent" />
                  {feature.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-glow-accent/10 to-glow-purple/10 blur-[100px] rounded-full" />
            
            <div className="relative rounded-[2.5rem] p-px bg-gradient-to-b from-white/20 to-transparent">
              <div className="relative glass rounded-[2.4rem] p-3 shadow-2xl overflow-hidden bg-black/40">
                <div className="relative aspect-[4/3] rounded-[1.8rem] overflow-hidden border border-white/10">
                  <img 
                    src={heroMockup} 
                    alt="AI Video Generation Interface" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-5 left-5 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                    Live Rendering
                  </div>
                  
                  <div className="absolute bottom-5 left-5 right-5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">AI Script Analysis</span>
                        <span className="text-[10px] text-glow-accent">85% Processed</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mic className="w-4 h-4 text-glow-accent" />
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full w-4/5 bg-gradient-to-r from-glow-accent to-glow-purple" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-24 h-24 border border-white/10 rounded-2xl rotate-12" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-glow-accent/10 rounded-3xl -rotate-12" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] to-transparent" />
    </section>
  );
}
