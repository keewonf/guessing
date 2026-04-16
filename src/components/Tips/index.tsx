import tipIcon from "../../assets/tip.svg";
import styles from "./styles.module.css";
import plusIcon from "../../assets/plus.svg";
import { useState } from "react";

type TipsProps = {
  tips: string[];
};

export function Tips({ tips }: TipsProps) {
  const [tipIndex, setTipIndex] = useState(0);

  function handleTip() {
    if (tips.length === 0) return;

    setTipIndex((currentIndex) => (currentIndex + 1) % tips.length);
  }

  return (
    <div className={styles.tip}>
      <img src={tipIcon} alt="Ícone de dica" />
      <div>
        <div className={styles.title}>
          <h3>Dica</h3>
          <button
            type="button"
            onClick={handleTip}
            disabled={tips.length === 0}
          >
            <img src={plusIcon} alt="Ícone de adicionar dica" />
          </button>
        </div>

        <p className={styles.tipText}>{tips[tipIndex] ?? "Sem dicas"}</p>
      </div>
    </div>
  );
}
