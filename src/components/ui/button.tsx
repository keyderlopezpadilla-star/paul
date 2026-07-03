"use client";

import Link from "next/link";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/interaction/magnetic";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none overflow-hidden";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest-700 text-white hover:bg-forest-800 focus-visible:ring-offset-paper",
  secondary:
    "bg-transparent text-forest-800 border border-forest-800/20 hover:border-forest-800/60",
  ghost: "bg-transparent text-forest-800 hover:bg-forest-50",
  light:
    "bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20 focus-visible:ring-offset-forest-900",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-[15px]",
  lg: "h-14 px-9 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  magnetic?: boolean;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps & { href: string; external?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonAsButton | ButtonAsLink>(
  function Button(props, ref) {
    const {
      children,
      variant = "primary",
      size = "md",
      className,
      magnetic = true,
      ...rest
    } = props as CommonProps & Record<string, unknown>;

    const classes = cn(base, variants[variant], sizes[size], className);

    const inner = (
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    );

    const shine = (
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
    );

    let node: ReactNode;
    if ("href" in props && props.href) {
      const { href, external } = props as ButtonAsLink;
      node = external ? (
        <a href={href} target="_blank" rel="noreferrer" className={classes} data-cursor="hover">
          {shine}
          {inner}
        </a>
      ) : (
        <Link href={href} className={classes} data-cursor="hover">
          {shine}
          {inner}
        </Link>
      );
    } else {
      node = (
        <button
          ref={ref}
          className={classes}
          data-cursor="hover"
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {shine}
          {inner}
        </button>
      );
    }

    return magnetic ? <Magnetic strength={0.3}>{node}</Magnetic> : node;
  },
);
