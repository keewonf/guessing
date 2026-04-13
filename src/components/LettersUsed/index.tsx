import { Letter } from "../Letter";
import styles from "./styles.module.css";

export function LettersUsed() {
  return (
    <div className={styles.lettersUsed}>
      <Letter value="R" size="small" color="correct"></Letter>
      <Letter value="L" size="small" color="wrong"></Letter>
      <Letter value="M" size="small" color="wrong"></Letter>
      <Letter value="P" size="small" color="wrong"></Letter>
      <Letter value="U" size="small" color="wrong"></Letter>
      <Letter value="X" size="small" color="wrong"></Letter>
    </div>
  );
}
