import { Button } from "@/components/ui/button";
import { Play, Sparkles, Mic, Video, Subtitles, Share2 } from "lucide-react";
import heroMockup from "@/assets/hero-mockup.png";

const features = [
  { icon: Sparkles, label: "AI Actors & Voices" },
  { icon: Video, label: "Instant UGC Ad Scripts" },
  { icon: Play, label: "Vertical & Horizontal Formats" },
  { icon: Subtitles, label: "Auto Subtitles" },
  { icon: Share2, label: "One-Click Publishing" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow-accent/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-purple/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "3s" }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glow-accent/20 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-glow-accent animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                Trusted by 10,000+ creators
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Create High-Converting{" "}
              <span className="text-gradient-accent">UGC Ads</span>{" "}
              in Minutes with AI
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Turn your product into scroll-stopping video ads without actors, cameras, or studios.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Generating – It's Free
              </Button>
              <Button variant="hero-secondary" size="xl">
                <Play className="w-5 h-5 mr-2" />
                View Demos
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 pt-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {features.map((feature, index) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <feature.icon className="w-4 h-4 text-glow-accent" />
                  {feature.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Product Mockup */}
          <div className="relative animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-glow-accent/20 to-glow-purple/20 blur-[80px] rounded-3xl" />
            
            {/* Main Card */}
            <div className="relative glass rounded-3xl p-2 shadow-2xl overflow-hidden">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                {/* Hero Image */}
                <img 
                  src={heroMockup} 
                  alt="AI Video Generation Interface" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                {/* Floating UI Elements */}
                <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-lg text-xs font-medium animate-float">
                  AI Generated
                </div>
                <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-lg text-xs font-medium animate-float" style={{ animationDelay: "1s" }}>
                  9:16 Vertical
                </div>
                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4 animate-float" style={{ animationDelay: "2s" }}>
                  <div className="flex items-center gap-3">
                    <Mic className="w-5 h-5 text-glow-accent" />
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-glow-accent to-glow-purple rounded-full" />
                    </div>
                    <span className="text-xs text-muted-foreground">0:28</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border border-border/30 rounded-2xl rotate-12 animate-float" style={{ animationDelay: "1.5s" }} />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-glow-accent/20 rounded-3xl -rotate-12 animate-float" style={{ animationDelay: "2.5s" }} />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
