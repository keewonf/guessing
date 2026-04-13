import styles from "./app.module.css";

import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Letter } from "./components/Letter";
import { Tip } from "./components/Tip";

function App() {
  function handleRestartGame() {
    alert("Reiniciar o jogo!");
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestartGame} />

        <Tip tip="Biblioteca para criar interfaces Web com Javascript." />
        <div className={styles.word}>
          <Letter value="R" />
          <Letter />
          <Letter />
          <Letter />
          <Letter />
        </div>

        <h4>Palpite</h4>

        <div>
          <Input autoFocus maxLength={1} placeholder="?"/>
        </div>
      </main>
    </div>
  );
}

export default App;
