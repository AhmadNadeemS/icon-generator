import cx from "clsx";

export default function FormGroup(
  props: React.ComponentPropsWithoutRef<"div">
) {
  return (
    <div {...props} className={cx("flex flex-col gap-1", props.className)}>
      {props.children}
    </div>
  );
}
