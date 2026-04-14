import styles from "./app.module.css";
import { useEffect, useState } from "react";

import { WORDS } from "./utils/words";
import type { Challenge } from "./utils/words";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Letter } from "./components/Letter";
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed";
import { Tip } from "./components/Tip";

function App() {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  function handleRestartGame() {
    alert("Reiniciar o jogo!");
  }

  function startGame(words: Challenge[]) {
    if (words.length === 0) return null;
    const index = Math.floor(Math.random() * words.length);
    const randomWord = words[index];
    setChallenge(randomWord);

    setAttempts(0);
    setLetter("");
  }

  function handleConfirm() {
    if (!challenge) {
      return;
    }
    if (!letter.trim()) {
      return alert("Digite uma letra!");
    }

    const value = letter.toUpperCase();
    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value,
    );
    if (exists) {
      return alert("Você já utilizou a letra " + value);
    }

    const challengeLetters = challenge.word.toUpperCase().split("");
    const hits = challengeLetters.filter((char) => {
      return char.toUpperCase() === value;
    }).length;

    const correct = hits > 0;
    const currentScore = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, correct }]);
    setScore(currentScore);

    setLetter("");
  }

  useEffect(() => {
    startGame(WORDS);
  }, []);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={attempts} max={10} onRestart={handleRestartGame} />

        <Tip tip={challenge.tip} />
        <div className={styles.word}>
          {challenge.word.split("").map(() => (
            <Letter />
          ))}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button onClick={handleConfirm}>Confirmar </Button>
        </div>
        <div className={styles.lettersUsedContainer}>
          <h5>Letras utilizadas</h5>
          <LettersUsed data={lettersUsed} />
        </div>
      </main>
    </div>
  );
}

export default App;
