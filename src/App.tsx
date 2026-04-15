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
import { GameResult, type GameStatus } from "./components/Modal/GameResult";

function App() {
  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [result, setResult] = useState<GameStatus | null>(null);

  const ATTEMPTS_MARGIN = 2;

  function handleRestartGame() {
    const isConfirmed = window.confirm(
      "Você tem certeza que deseja reiniciar?",
    );

    if (isConfirmed) {
      setResult(null);
      startGame(WORDS);
    }
  }

  function startGame(words: Challenge[]) {
    if (words.length === 0) return null;
    const index = Math.floor(Math.random() * words.length);
    const randomWord = words[index];
    setChallenge(randomWord);

    setScore(0);
    setLetter("");
    setLettersUsed([]);
  }

  function handleConfirm() {
    if (result !== null) {
      return;
    }

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
      setLetter("");
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

  function endGame(result: GameStatus) {
    setResult(result);
    //startGame(WORDS);
  }

  useEffect(() => {
    startGame(WORDS);
  }, []);

  useEffect(() => {
    if (!challenge) {
      return;
    }
    const timeout = setTimeout(() => {
      if (score === challenge.word.length) {
        endGame("win");
      }

      if (lettersUsed.length === challenge.word.length + ATTEMPTS_MARGIN) {
        endGame("lose");
      }
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [score, lettersUsed.length, challenge]);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + ATTEMPTS_MARGIN}
          onRestart={handleRestartGame}
        />

        <Tip tip={challenge.tip} />
        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase(),
            );
            return (
              <Letter
                key={index}
                value={letterUsed?.value}
                color={letterUsed?.correct ? "correct" : "default"}
              />
            );
          })}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            disabled={result !== null}
          />
          <Button onClick={handleConfirm} disabled={result !== null}>
            Confirmar{" "}
          </Button>
        </div>
        <div className={styles.lettersUsedContainer}>
          <h5>Letras utilizadas</h5>
          <LettersUsed data={lettersUsed} />
        </div>
      </main>
      {result !== null && <GameResult status={result} />}
    </div>
  );
}

export default App;
