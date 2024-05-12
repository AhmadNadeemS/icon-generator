import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export default function PrimaryLink(
  props: LinkProps & { children: ReactNode }
) {
  return (
    <Link {...props} className="hover:text-cyan-500">
      {props.children}
    </Link>
  );
}
