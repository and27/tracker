import { Link } from "react-router-dom";
import clsx from "clsx";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

type LinkButtonProps =
  | (CommonProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        to: string;
        href?: never;
      })
  | (CommonProps &
      AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
        to?: never;
      });

const LinkButton = (props: LinkButtonProps) => {
  const { children, className, variant = "primary" } = props;

  const baseClass =
    variant === "primary"
      ? "bg-indigo-600 hover:bg-indigo-700 text-neutral-100"
      : "bg-transparent border border-neutral-800 dark:border-white hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100";

  const finalClass = clsx(
    "px-5 py-2 rounded text-sm md:text-base",
    baseClass,
    className
  );

  if ("to" in props) {
    return (
      <Link to={props.to as string} className={finalClass}>
        {children}
      </Link>
    );
  }

  return (
    <a href={props.href} className={finalClass}>
      {children}
    </a>
  );
};

export default LinkButton;
