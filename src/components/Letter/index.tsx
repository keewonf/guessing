import styles from "./styles.module.css";

type LetterProps = {
  value?: string;
  size?: "default" | "small"
};

export function Letter({ value = "", size = "default"}: LetterProps) {
  return (
    <div className={`${styles.container} ${size === "small" && styles.letterSmall }`}>
      <span>{value}</span>
    </div>
  );
}
