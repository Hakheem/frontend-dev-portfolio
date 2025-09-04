import React from "react";
import { cn } from "@/lib/utils"; 

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "glow"
    | "link";
  size?: "sm" | "default" | "lg" | "xl" | "icon";
  children: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary", 
      size = "default",
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export function buttonVariants({
  variant = "primary", 
  size = "default",
  className,
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
} = {}) {
 const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

  const variants = { 
    primary:
      "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 shadow-md hover:shadow-lg active:opacity-90",
    secondary:
      "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-400/30",
    outline:
      "border border-blue-400/40 bg-transparent text-blue-400 hover:bg-blue-500/10 hover:text-blue-300",
    ghost:
      "text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 rounded-lg",
    destructive:
      "bg-gradient-to-r from-red-500 to-red-400 text-white hover:from-red-600 hover:to-red-500 shadow-md hover:shadow-lg active:opacity-90",
    glow: "bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 shadow-lg hover:shadow-blue-500/40 active:opacity-90",
    link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300 bg-transparent border-none shadow-none p-0 h-auto",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-11 px-6 text-base",
    xl: "h-12 px-8 text-lg font-semibold",
    icon: "h-10 w-10 p-0",
  };

  return cn(baseStyles, variants[variant], sizes[size], className);
}

export default Button;
