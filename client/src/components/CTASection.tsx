import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-glow-accent/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-glow opacity-10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-[1px] bg-gradient-glow">
            <div className="rounded-3xl bg-card p-12 lg:p-16 text-center relative overflow-hidden">
              {/* Shine Effect */}
              <div className="shine absolute inset-0" />

              <div className="relative z-10 space-y-8">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-glow flex items-center justify-center animate-glow-pulse">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Ready to Transform Your Brand<br className="hidden sm:block" />
                  with UGC Ads?
                </h2>

                {/* Subtext */}
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Join thousands of brands creating high-converting video ads in minutes.
                  Start for free, no credit card required.
                </p>

                {/* CTA Button */}
                <Button variant="hero" size="xl" className="group">
                  Start Creating Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    3 free generations
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Cancel anytime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
