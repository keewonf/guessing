import styles from "./styles.module.css";

type ButtonProps = React.ComponentProps<"button">;

export function Button({ children, ...rest }: ButtonProps) {
  return <button className={styles.button} {...rest}>{children}</button>;
}
