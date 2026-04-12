import tipIcon from "../../assets/tip.svg";
import styles from "./styles.module.css";

type TipProps = {
  tip: string;
};

export function Tip({ tip }: TipProps) {
  return (
    <div className={styles.tip}>
      <img src={tipIcon} alt="Ícone de dica" />
      <div>
        <h3>Dica</h3>
        <p>{tip}</p>
      </div>
    </div>
  );
}
