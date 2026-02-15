import * as React from "react";
import { cn } from "./utils";

export const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm",
      className
    )}
    {...props}
  />
);

export const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1 border-b px-4 py-3", className)} {...props} />
);

export const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn("text-sm font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

export const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-xs text-slate-500", className)} {...props} />
);

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-4 py-3", className)} {...props} />
);
