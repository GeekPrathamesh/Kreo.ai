
const features = [
  "Very Cost Effective",
  "Ultra Rapid Generation",
  "High Efficiency AI",
  "4K Video Quality",
  "Script + Voice Auto",
  "Multi-Language Support",
  "Ad-Optimized Hooks",
  "Brand Style Matching",
];

export function FeaturesSlider() {
  const duplicated = [...features, ...features];

  return (
    <div className="relative overflow-hidden">
      {/* Soft fade using mask instead of background */}
      <div className="absolute inset-0 pointer-events-none 
                      [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />

      <div className="flex animate-marquee-slow gap-8 py-6">
        {duplicated.map((feature, index) => (
          <div
            key={index}
            className="px-5 py-2 rounded-full
                       text-sm font-medium whitespace-nowrap
                       text-foreground/90
                       border border-white/10
                       backdrop-blur-md
                       hover:scale-105 transition-transform duration-300
                       glow-subtle"
          >
            ✨ {feature}
          </div>
        ))}
      </div>
    </div>
  );
}


