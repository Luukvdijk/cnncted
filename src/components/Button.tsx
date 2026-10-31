import Link from "next/link";

type Variant = "ink" | "lime" | "line";

export function Button({
  href,
  children,
  variant = "ink",
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      <span className="btn-dot" aria-hidden="true" />
      <span>{children}</span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
