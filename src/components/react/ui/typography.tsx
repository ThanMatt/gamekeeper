import * as React from "react";

import { cn } from "@/lib/utils";

// :: Base components props should extend the HTML attributes instead of having a separate interface
type BaseProps<T> = React.HTMLAttributes<T> & {
  className?: string;
  children?: React.ReactNode;
};

// :: Specific element props
type HeadingProps = BaseProps<HTMLHeadingElement>;
type ParagraphProps = BaseProps<HTMLParagraphElement>;

// H1 Component
export const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "mb-4 scroll-m-20 text-3xl font-extrabold tracking-tight sm:mb-6 sm:text-4xl lg:text-5xl",
        className
      )}
      {...props}
    />
  )
);
H1.displayName = "H1";

// H2 Component
export const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "mb-3 scroll-m-20 pb-1 font-sans text-2xl font-semibold tracking-tight first:mt-0 sm:mb-4 sm:pb-2 sm:text-3xl",
        className
      )}
      {...props}
    />
  )
);
H2.displayName = "H2";

// H3 Component
export const H3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "mb-2 scroll-m-20 font-sans text-xl font-semibold tracking-tight sm:mb-3 sm:text-2xl",
        className
      )}
      {...props}
    />
  )
);
H3.displayName = "H3";

// H4 Component
export const H4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn(
        "mb-2 scroll-m-20 font-sans text-lg font-semibold tracking-tight sm:text-xl",
        className
      )}
      {...props}
    />
  )
);
H4.displayName = "H4";

// Paragraph Component
export const TextContent = React.forwardRef<
  HTMLParagraphElement,
  ParagraphProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-sans text-base leading-6 sm:leading-7 [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6",
      className
    )}
    {...props}
  />
));
TextContent.displayName = "TextContent";

// Large Text Component
export const Large = React.forwardRef<
  HTMLDivElement,
  BaseProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-sans text-base font-semibold sm:text-lg", className)}
    {...props}
  />
));
Large.displayName = "Large";

// Small Text Component
export const Small = React.forwardRef<HTMLElement, BaseProps<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn(
        "text-xs leading-normal font-medium sm:text-sm sm:leading-none",
        className
      )}
      {...props}
    />
  )
);
Small.displayName = "Small";

// Subtle Text Component
export const Subtle = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-muted-foreground text-xs leading-relaxed sm:text-sm",
        className
      )}
      {...props}
    />
  )
);
Subtle.displayName = "Subtle";

// Lead Paragraph Component
export const Lead = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-muted-foreground text-lg leading-relaxed sm:text-xl",
        className
      )}
      {...props}
    />
  )
);
Lead.displayName = "Lead";

// Blockquote Component
export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  BaseProps<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      "[&>*]:text-muted-foreground mt-4 border-l-2 pl-4 italic sm:mt-6 sm:pl-6",
      className
    )}
    {...props}
  />
));
Blockquote.displayName = "Blockquote";
