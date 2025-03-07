import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        customBlue:
          "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600",
        customFuchsia:
          "bg-fuchsia-950 border-fuchsia-950 text-white hover:bg-fuchsia-900 hover:border-fuchsia-900",
        customRose:
          "bg-rose-500 border-rose-500 text-white hover:bg-rose-600 hover:border-rose-600",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  asChild = false,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  variant?: string;
  size?: string;
}) {
  const Comp = asChild ? Slot : "button";

  // Simple variant mapping
  const variantClasses = {
    default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
    destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90",
    outline:
      "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
    secondary:
      "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    customBlue:
      "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600",
    customFuchsia:
      "bg-fuchsia-950 border-fuchsia-950 text-white hover:bg-fuchsia-900 hover:border-fuchsia-900",
    customRose:
      "bg-rose-500 border-rose-500 text-white hover:bg-rose-600 hover:border-rose-600",
  };

  // Simple size mapping
  const sizeClasses = {
    default: "h-9 px-4 py-2 has-[>svg]:px-3",
    sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
    lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
    icon: "size-9",
  };

  return (
    <Comp
      data-slot="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variant && variantClasses[variant as keyof typeof variantClasses],
        size && sizeClasses[size as keyof typeof sizeClasses],
        className,
        "cursor-pointer"
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
