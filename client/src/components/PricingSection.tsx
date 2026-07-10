import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Loader2, Coins } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { toast } from "sonner";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 30,
    description: "Perfect for individuals getting started with AI video ads",
    credits: 50,
    features: [
      "50 credits instantly added",
      "Generate up to 10 video ads",
      "720p HD output quality",
      "Standard AI actors",
      "Email support",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    description: "Best for growing creators and e-commerce brands",
    credits: 200,
    features: [
      "200 credits instantly added",
      "Generate up to 40 video ads",
      "1080p Full HD output quality",
      "Premium AI actors & voices",
      "Priority customer support",
      "Remove all watermarks",
    ],
    popular: true,
  },
  {
    id: "agency",
    name: "Agency",
    price: 199,
    description: "For marketing agencies and high-volume teams",
    credits: 500,
    features: [
      "500 credits instantly added",
      "Generate up to 100 video ads",
      "4K Ultra HD output quality",
      "All AI actors, voices & templates",
      "Dedicated account manager",
      "API access & white-label options",
      "Team collaboration features",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (planId: string) => {
    if (!user) {
      toast.info("Please sign in to purchase a plan");
      navigate("/auth");
      return;
    }

    try {
      setLoadingPlan(planId);
      const { data } = await api.post("/api/stripe/create-checkout-session", { planId });
      if (data?.url) {
        window.location.href = data.url; // redirect directly to Stripe checkout page
      } else {
        toast.error("Failed to generate payment session");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section
      id="pricing"
      className="md:py-24 py-10 relative overflow-hidden"
    >
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4f39f6]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Simple, Transparent <span className="text-gradient-glow text-primary">Pricing</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Choose the right amount of credits for your needs. Top up whenever you want.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`glass-strong rounded-3xl p-8 transition-all flex flex-col justify-between border relative backdrop-blur-xl ${
                plan.popular 
                  ? "border-[#4f39f6] bg-[#4f39f6]/[0.02] shadow-[0_0_50px_-12px_rgba(79,57,246,0.3)] md:scale-105" 
                  : "border-white/10 bg-white/[0.01] hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-semibold uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg shadow-primary/30">
                  <Sparkles className="w-3.5 h-3.5" /> Most Popular
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{plan.description}</p>
                </div>

                {/* Plan Price */}
                <div className="mb-6 flex items-baseline gap-1.5 border-b border-white/10 pb-6">
                  <span className="text-5xl font-black text-white">${plan.price}</span>
                  <span className="text-slate-500 text-sm font-medium">one-time</span>
                </div>

                {/* Credit Badge */}
                <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">Credits included:</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/20 border border-primary/30">
                    <Coins className="w-4 h-4 text-primary" />
                    <span className="font-bold text-white">{plan.credits}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Button
                variant={plan.popular ? "default" : "outline"}
                className={`w-full h-12 font-bold rounded-xl transition-all ${
                  plan.popular 
                    ? "bg-[#4f39f6] text-white hover:bg-[#4f39f6]/95 hover:scale-[1.02]" 
                    : "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                }`}
                disabled={loadingPlan !== null}
                onClick={() => handleCheckout(plan.id)}
              >
                {loadingPlan === plan.id ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  `Get ${plan.name}`
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
