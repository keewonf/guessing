import { Letter } from "../Letter";
import styles from "./styles.module.css";

export function LettersUsed() {
  return (
    <div className={styles.lettersUsed}>
      <Letter value="R" size="small"></Letter>
      <Letter value="L" size="small"></Letter>
      <Letter value="M" size="small"></Letter>
      <Letter value="P" size="small"></Letter>
      <Letter value="U" size="small"></Letter>
      <Letter value="X" size="small"></Letter>
    </div>
  );
}
