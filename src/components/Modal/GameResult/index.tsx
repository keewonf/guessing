import styles from "./styles.module.css";

export type GameStatus = "win" | "lose";

type GameResultProps = {
  status: GameStatus;
};

export function GameResult({ status }: GameResultProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>resultados</h1>
        <div className={styles.statsContainer}>
          <div className={styles.stat}>
            <strong>6</strong>
            <span>chances usadas</span>
          </div>
          <div className={styles.stat}>
            <strong>10</strong>
            <span>chances restantes</span>
          </div>
          <div className={styles.stat}>
            <strong>Fácil</strong>
            <span>dificuldade</span>
          </div>
        </div>
        <div className={styles.wordInfoContainer}>
          <p>
            A palavra do dia era <strong>REACT</strong>
          </p>

          <p>Explicação da dica dada a a a a a a a</p>
        </div>
      </div>
    </div>
  );
}
