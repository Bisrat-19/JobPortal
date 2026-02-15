import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
}

const baseStyles =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-emerald-600 text-white hover:bg-emerald-700",
  outline:
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400",
  secondary:
    "bg-slate-800 text-white hover:bg-slate-900",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-3",
  md: "h-9 px-4",
  lg: "h-10 px-5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
