import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium variants for ugc.ai
        glow: "relative overflow-hidden bg-primary text-primary-foreground font-semibold before:absolute before:inset-[-2px] before:bg-gradient-to-r before:from-[hsl(200,100%,60%)] before:to-[hsl(270,100%,70%)] before:rounded-lg before:-z-10 before:opacity-80 before:transition-opacity before:duration-300 hover:before:opacity-100 after:absolute after:inset-[1px] after:bg-background after:rounded-[calc(0.5rem-1px)] after:-z-10 hover:shadow-[0_0_40px_-10px_hsl(200,100%,60%)]",
        hero: "relative bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base rounded-xl shadow-[0_0_40px_-10px_hsl(0,0%,100%,0.4)] hover:shadow-[0_0_60px_-10px_hsl(0,0%,100%,0.6)] hover:scale-[1.02] active:scale-[0.98]",
        "hero-secondary": "relative border border-border/50 bg-transparent text-foreground font-medium px-8 py-6 text-base rounded-xl hover:bg-secondary/50 hover:border-border backdrop-blur-sm",
        glass: "bg-secondary/30 backdrop-blur-xl border border-border/50 text-foreground hover:bg-secondary/50",
        premium: "bg-gradient-to-r from-[hsl(200,100%,60%)] to-[hsl(270,100%,70%)] text-white font-semibold shadow-lg hover:shadow-[0_0_40px_-5px_hsl(200,100%,60%)] hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
