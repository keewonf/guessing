import { Letter } from "../Letter";
import styles from "./styles.module.css";

export type LettersUsedProps = {
  value: string;
  correct: boolean;
};

type Props = {
  data: LettersUsedProps[];
};

export function LettersUsed({ data }: Props) {
  return (
    <div className={styles.lettersUsed}>
      {data.map(({ value, correct }) => {
        return (
          <Letter
            value={value}
            size="small"
            color={correct ? "correct" : "wrong"}
          ></Letter>
        );
      })}
    </div>
  );
}
