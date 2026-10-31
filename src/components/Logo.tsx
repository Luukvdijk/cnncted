import Image from "next/image";
import Link from "next/link";

export function Logo({ href, label = "Cnncted home" }: { href: string; label?: string }) {
  return (
    <Link href={href} aria-label={label} className="group inline-flex items-center gap-2.5">
      <Image
        src="/media/logo-mark.png"
        alt=""
        width={40}
        height={40}
        priority
        className="size-9 rounded-full transition-transform duration-700 ease-(--ease-out-expo) group-hover:rotate-[-24deg] md:size-10"
      />
      <span className="text-[1.45rem] font-extrabold tracking-[-0.06em] md:text-[1.6rem]">cnncted</span>
    </Link>
  );
}
