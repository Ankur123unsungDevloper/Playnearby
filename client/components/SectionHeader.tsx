import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

export function SectionHeader({ title, href, label }: { title: string; href: string; label: string }) {
  return (
    <div className="flex w-full items-center justify-between px-5">
      <h4 className="text-2xl font-bold text-black">{title}</h4>
      <Link
        href={href}
        className="group flex items-center gap-1.5 text-base font-semibold text-primary transition-colors hover:text-primary/80"
      >
        {label}
        <MdArrowForwardIos className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
