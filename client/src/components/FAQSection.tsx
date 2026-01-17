import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is UGC and why do I need it?",
    answer:
      "UGC (User-Generated Content) style ads are authentic, relatable video advertisements that look like they were created by real customers. They convert up to 4x better than traditional ads because they build trust and feel genuine.",
  },
  {
    question: "How does ugc.ai generate videos?",
    answer:
      "Our AI analyzes your product, generates compelling scripts, selects appropriate AI actors and voices, and produces professional-quality video ads. The entire process takes just minutes, not days.",
  },
  {
    question: "Can I use these videos for paid advertising?",
    answer:
      "Absolutely! All videos generated with ugc.ai are fully licensed for commercial use, including paid advertising on platforms like Meta, TikTok, YouTube, and more.",
  },
  {
    question: "What video formats are supported?",
    answer:
      "We support all major formats: 9:16 (vertical/TikTok/Reels), 16:9 (landscape/YouTube), and 1:1 (square/Instagram). You can generate multiple formats from the same project.",
  },
  {
    question: "How many AI actors and voices are available?",
    answer:
      "Our library includes 50+ diverse AI actors and 100+ realistic AI voices in multiple languages and accents. We regularly add new options based on user feedback.",
  },
  {
    question: "Can I customize the generated content?",
    answer:
      "Yes! You can adjust scripts, select different actors, change voice styles, modify pacing, and add your own branding elements. Full creative control is in your hands.",
  },
  {
    question: "What if I'm not satisfied with a generation?",
    answer:
      "You can regenerate videos as many times as needed within your plan limits. Our AI learns from your preferences to improve results over time.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! New users get 3 free video generations to experience the platform. No credit card required to start.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about creating UGC ads with AI
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-xl px-6 border-0 data-[state=open]:ring-1 data-[state=open]:ring-glow-accent/30 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-5 hover:text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
