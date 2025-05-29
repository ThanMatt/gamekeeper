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
type ListProps = BaseProps<HTMLUListElement> & {
  items?: string[];
};

// H1 Component
export const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-4 sm:mb-6",
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
        "scroll-m-20 pb-1 sm:pb-2 font-sans text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0 mb-3 sm:mb-4",
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
        "scroll-m-20 text-xl sm:text-2xl font-sans font-semibold tracking-tight mb-2 sm:mb-3",
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
        "scroll-m-20 text-lg sm:text-xl font-sans font-semibold tracking-tight mb-2",
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
      "leading-6 sm:leading-7 font-sans text-base [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6",
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
    className={cn("text-base sm:text-lg font-sans font-semibold", className)}
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
        "text-xs sm:text-sm font-medium leading-normal sm:leading-none",
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
        "text-xs sm:text-sm text-muted-foreground leading-relaxed",
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
        "text-lg sm:text-xl text-muted-foreground leading-relaxed",
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
      "mt-4 sm:mt-6 border-l-2 pl-4 sm:pl-6 italic [&>*]:text-muted-foreground",
      className
    )}
    {...props}
  />
));
Blockquote.displayName = "Blockquote";
