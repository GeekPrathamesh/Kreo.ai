import { Button } from "@/components/ui/button";
import { Play, Sparkles, Mic, Video, Subtitles, Share2, CheckCircle2, ArrowRight } from "lucide-react";
import heroMockup from "@/assets/hero-mockup.png";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const features = [
  { icon: Sparkles, label: "AI Actors" },
  { icon: Video, label: "Viral Scripts" },
  { icon: Play, label: "4K Export" },
  { icon: Subtitles, label: "Auto-Captions" },
];

export function HeroSection() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();

  const handleStart = () => {
    if (isSignedIn) {
      navigate("/create");
    } else {
      openSignUp({
        afterSignInUrl: "/create",
        afterSignUpUrl: "/create",
      });
    }
  };

  return (
    <section className=" mt-4 relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 bg-[#030303] selection:bg-glow-accent/30">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-dark opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-glow-accent/15 rounded-full blur-[120px] -z-10 mix-blend-screen" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-glow-purple/10 rounded-full blur-[120px] -z-10 mix-blend-screen" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Main Content Stack */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto mb-12">
          
          {/* Brand Badge */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:bg-white/10 transition-colors cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-glow-accent">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-glow-accent opacity-75"></span>
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase text-neutral-300">
                New: Kreo AI 2.0 is live
              </span>
              <ArrowRight className="w-3 h-3 text-neutral-500 ml-1" />
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white">
              Stop filming. <br className="hidden md:block" />
              Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-accent via-white to-glow-purple animate-gradient-x">generating.</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              <span className="text-xl font-bold text-foreground tracking-tight group-hover:text-glow transition-all duration-300">
              Kreo<span className="text-glow-accent">.ai</span>
            </span> turns your product URL into high-performing video ads with AI actors, viral hooks, and voiceovers. No studio required.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <Button 
              variant="default" 
              size="xl" 
              onClick={handleStart}
              className="bg-white text-black hover:bg-neutral-200 hover:scale-105 transition-all duration-300 font-bold px-10 h-14 text-base shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Ad with Kreo
            </Button>

            <Button 
              variant="outline" 
              size="xl" 
              onClick={() => navigate("/generations")}
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all h-14 text-base px-10"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators / Features */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-6 opacity-60 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            {features.map((feature) => (
              <div key={feature.label} className="flex items-center gap-2 text-sm font-medium text-neutral-400">
                <feature.icon className="w-4 h-4 text-neutral-500" />
                {feature.label}
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Mockup - The "Product Reveal" */}
        <div className="relative w-full max-w-6xl mx-auto mt-8 group perspective-[2000px]">
          
          {/* Glow behind dashboard */}
          <div className="absolute -inset-1 bg-gradient-to-r from-glow-accent/20 via-purple-500/20 to-glow-accent/20 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />

          {/* Main Dashboard Container */}
          <div className="relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl overflow-hidden transform transition-transform duration-700 hover:rotate-x-1">
            
{/* Content Area */}
<div className="relative pt-12 px-8 pb-10 text-white">
  
  {/* Header */}
  <h2 className="text-2xl font-semibold tracking-tight mb-3">
    Create high-converting ads in minutes
  </h2>

  <p className="text-sm text-neutral-400 max-w-xl mb-8">
    kreo.ai uses custom-trained AI models to turn your brand assets into 
    scroll-stopping ads — no editing skills required.
  </p>

  {/* Steps */}
  <div className="space-y-6 max-w-xl">
    
    <div className="flex gap-4">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-xs font-mono">
        01
      </div>
      <div>
        <h3 className="text-sm font-medium">Upload your brand assets</h3>
        <p className="text-xs text-neutral-400">
          Add product images, logos, or reference creatives. 
          kreo understands your brand style instantly.
        </p>
      </div>
    </div>



    <div className="flex gap-4">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-xs font-mono">
        02
      </div>
      <div>
        <h3 className="text-sm font-medium">Generate ad creatives</h3>
        <p className="text-xs text-neutral-400">
          Instantly create Reels, Stories, and Ads optimized for 
          Instagram, YouTube, and Meta campaigns.
        </p>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-xs font-mono">
        03
      </div>
      <div>
        <h3 className="text-sm font-medium">One-click export & publish</h3>
        <p className="text-xs text-neutral-400">
          Download or publish directly in the correct aspect ratio 
          with captions and hooks included.
        </p>
      </div>
    </div>

  </div>

  {/* Footer Features */}
  <div className="mt-10 grid grid-cols-2 gap-4 text-xs text-neutral-400 max-w-xl">
    <div>✓ Brand-consistent outputs</div>
    <div>✓ Multiple ad variations</div>
    <div>✓ Platform-optimized formats</div>
    <div>✓ No design skills needed</div>
  </div>

</div>



          </div>
        </div>

      </div>
    </section>
  );
}