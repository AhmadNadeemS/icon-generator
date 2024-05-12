import cx from "clsx";
import Spinner from "./Spinner";
export default function Button(
  props: React.ComponentPropsWithoutRef<"button"> & {
    variant?: "primary" | "secondary";
    isLoading?: boolean;
  }
) {
  const { isLoading, value, ...rest } = props;
  const color =
    (props.variant ?? "primary") === "primary"
      ? "bg-blue-400 hover:bg-blue-500"
      : "bg-gray-400 hover:bg-gray-500";
  return (
    <button
      {...rest}
      className={cx(
        "flex items-center justify-center gap-2 rounded px-4 py-2 disabled:bg-gray-500",
        color
      )}
    >
      {isLoading && <Spinner />}
      {props.children}
    </button>
  );
}
