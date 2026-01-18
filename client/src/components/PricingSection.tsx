import { Button } from "@/components/ui/button";
import { PricingTable } from "@clerk/clerk-react";
import { Check, Sparkles } from "lucide-react";

// const plans = [
//   {
//     name: "Starter",
//     price: 30,
//     description: "Perfect for individuals getting started",
//     credits: "100 credits/month",
//     features: [
//       "10 video generations",
//       "720p video quality",
//       "5 AI voice options",
//       "Basic templates",
//       "Email support",
//     ],
//     popular: false,
//   },
//   {
//     name: "Pro",
//     price: 79,
//     description: "Best for growing creators & small teams",
//     credits: "500 credits/month",
//     features: [
//       "50 video generations",
//       "1080p video quality",
//       "20 AI voice options",
//       "Premium templates",
//       "Priority support",
//       "Remove watermark",
//       "API access",
//     ],
//     popular: true,
//   },
//   {
//     name: "Agency",
//     price: 199,
//     description: "For agencies & enterprise teams",
//     credits: "Unlimited credits",
//     features: [
//       "Unlimited video generations",
//       "4K video quality",
//       "All AI voices & actors",
//       "Custom templates",
//       "Dedicated support",
//       "White-label option",
//       "Team collaboration",
//       "Advanced analytics",
//     ],
//     popular: false,
//   },
// ];
export function PricingSection() {
  return (
    <section
      id="pricing"
      className="md:py-24 py-10 relative overflow-hidden"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow-accent/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-0">
       <PricingTable
  appearance={{
    variables: {
      colorBackground: "#0a0a0a",
      colorText: "white",
    },
    elements: {
      modalBackdrop: "fixed inset-0 flex items-center justify-center bg-black/60",
      modalContent:
        "max-w-lg w-full h-auto rounded-2xl p-6 bg-background shadow-2xl",
    },
  }}
/>


      </div>
    </section>
  );
}
