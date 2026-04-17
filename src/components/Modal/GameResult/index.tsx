import type { Challenge } from "../../../utils/words";
import styles from "./styles.module.css";

export type GameStatus = "win" | "lose";

type GameResultProps = {
  status: GameStatus;
  challenge: Challenge;
  attempts: number;
  maxAttempts: number;
  wrongAttempts: number;
  onClose: () => void;
};

function getDifficultyByWordLength(wordLength: number) {
  if (wordLength >= 8) {
    return "Difícil";
  }

  if (wordLength >= 5) {
    return "Médio";
  }

  return "Fácil";
}

function getWinMessage(extraAttempts: number, wrongAttempts: number) {
  const extraAttemptsUsed = Math.min(extraAttempts, wrongAttempts);
  const extraAttemptsLeft = Math.max(0, extraAttempts - wrongAttempts);

  if (extraAttemptsUsed === 0) {
    return "Perfeito!";
  }

  if (extraAttemptsLeft > 0) {
    return "Boa!";
  }

  return "Ufa!";
}

export function GameResult({
  status,
  challenge,
  attempts,
  maxAttempts,
  wrongAttempts,
  onClose,
}: GameResultProps) {
  const isWin = status === "win";
  const difficulty = getDifficultyByWordLength(challenge.word.length);
  const extraAttempts = maxAttempts - challenge.word.length;
  const winMessage = getWinMessage(extraAttempts, wrongAttempts);
  const remainingAttempts = maxAttempts - attempts;

  const title = isWin ? winMessage : "Que pena!";

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.currentTarget === e.target) {
      return onClose();
    }

    return;
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <h2>resultados</h2>
        <div className={styles.statsContainer}>
          <div className={styles.stat}>
            <strong>{attempts}</strong>
            <span>tentativas</span>
          </div>
          <div className={styles.stat}>
            <strong>{remainingAttempts}</strong>
            <span>tentativas restantes</span>
          </div>
          <div className={styles.stat}>
            <strong>{difficulty}</strong>
            <span>dificuldade</span>
          </div>
        </div>
        <div className={styles.wordInfoContainer}>
          <p className={styles.wordLabel}>A palavra do dia era</p>
          <strong className={styles.dayWord}>
            {challenge.word.toUpperCase()}
          </strong>
          <h2>Curiosidade:</h2>
          <p>{challenge.trivia}</p>
        </div>
      </div>
    </div>
  );
}
