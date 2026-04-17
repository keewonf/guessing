import styles from "./styles.module.css";

type InputProps = React.ComponentProps<"input"> & {
  inputSize?: "default" | "full";
};

export function Input({ inputSize = "default", ...rest }: InputProps) {
  return (
    <input
      type="text"
      className={`${styles.input} ${inputSize === "full" ? styles.full : ""}`}
      {...rest}
    ></input>
  );
}
