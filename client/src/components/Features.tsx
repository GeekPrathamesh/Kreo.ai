import { Sparkles, Video, Zap, Shield } from "lucide-react";

const features = [
  {
    title: "AI-Powered UGC Videos",
    description: "Generate high-converting UGC style ads with realistic AI actors and voices in minutes.",
    icon: Video,
  },
  {
    title: "Lightning Fast Generation",
    description: "Create professional ad videos 10x faster than traditional editing workflows.",
    icon: Zap,
  },
  {
    title: "Brand-Safe & Secure",
    description: "Enterprise-grade security, watermark control, and brand-consistent outputs every time.",
    icon: Shield,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-glow-accent/5 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Powerful Features for Modern Creators
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to create, scale, and optimize high-performing UGC video ads.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative rounded-2xl p-[1px] bg-border card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-full rounded-2xl p-8 bg-card">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-glow-accent/10 mb-6">
                  <feature.icon className="w-6 h-6 text-glow-accent" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
