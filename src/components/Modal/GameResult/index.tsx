import type { Challenge } from "../../../utils/words";
import styles from "./styles.module.css";

export type GameStatus = "win" | "lose";

type GameResultProps = {
  status: GameStatus;
  challenge: Challenge;
  attempts: number;
  maxAttempts: number;
};

export function GameResult({
  status,
  challenge,
  attempts,
  maxAttempts,
}: GameResultProps) {
  let difficulty = "Fácil";
  if (challenge.word.length >= 5) {
    difficulty = "Médio";
  }

  if (challenge.word.length >= 8) {
    difficulty = "Difícil";
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>resultados</h1>
        <div className={styles.statsContainer}>
          <div className={styles.stat}>
            <strong>{attempts}</strong>
            <span>chances usadas</span>
          </div>
          <div className={styles.stat}>
            <strong>{maxAttempts - challenge.word.length}</strong>
            <span>chances restantes</span>
          </div>
          <div className={styles.stat}>
            <strong>{difficulty}</strong>
            <span>dificuldade</span>
          </div>
        </div>
        <div className={styles.wordInfoContainer}>
          <p>
            A palavra do dia era <strong>{challenge.word.toUpperCase()}</strong>
          </p>

          <p>{challenge.tip}</p>
        </div>
      </div>
    </div>
  );
}
