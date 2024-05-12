import cx from "clsx";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export default function PrimaryLinkButton(
  props: LinkProps & { children: ReactNode, className?: string }
) {
  return (
    <Link
      {...props}
      className={cx("rounded bg-blue-400 px-4 py-2 hover:bg-blue-500", props.className)}
    >
      {props.children}
    </Link>
  );
}
