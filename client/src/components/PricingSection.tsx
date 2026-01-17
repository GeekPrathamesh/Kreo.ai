import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 30,
    description: "Perfect for individuals getting started",
    credits: "100 credits/month",
    features: [
      "10 video generations",
      "720p video quality",
      "5 AI voice options",
      "Basic templates",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: 79,
    description: "Best for growing creators & small teams",
    credits: "500 credits/month",
    features: [
      "50 video generations",
      "1080p video quality",
      "20 AI voice options",
      "Premium templates",
      "Priority support",
      "Remove watermark",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Agency",
    price: 199,
    description: "For agencies & enterprise teams",
    credits: "Unlimited credits",
    features: [
      "Unlimited video generations",
      "4K video quality",
      "All AI voices & actors",
      "Custom templates",
      "Dedicated support",
      "White-label option",
      "Team collaboration",
      "Advanced analytics",
    ],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow-accent/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core AI features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-[1px] ${
                plan.popular
                  ? "bg-gradient-glow"
                  : "bg-border"
              } card-hover`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`h-full rounded-2xl p-8 ${
                plan.popular
                  ? "bg-card"
                  : "bg-card"
              }`}>
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-glow rounded-full text-sm font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Header */}
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  {/* Credits */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 text-sm">
                    <span className="font-medium">{plan.credits}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="w-5 h-5 text-glow-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant={plan.popular ? "premium" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    Choose {plan.name}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
