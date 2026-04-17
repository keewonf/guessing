import styles from "./app.module.css";
import { useEffect, useState } from "react";

import { WORDS } from "./utils/words";
import type { Challenge } from "./utils/words";
import { Header } from "./components/Header";
import { Letter } from "./components/Letter";
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed";
import { Tips } from "./components/Tips";
import { GameResult, type GameStatus } from "./components/Modal/GameResult";
import { GuessForm } from "./components/GuessForm";

function App() {
  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState("");
  const [wordGuess, setWordGuess] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [result, setResult] = useState<GameStatus | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const wrongAttempts = lettersUsed.filter((item) => !item.correct).length;
  const isWin = result === "win";

  const ATTEMPTS_MARGIN = 2;
  const maxAttempts = (challenge?.word.length ?? 0) + ATTEMPTS_MARGIN;

  function handleRestartGame() {
    const isConfirmed = window.confirm(
      "Você tem certeza que deseja reiniciar?",
    );

    if (isConfirmed) {
      setResult(null);
      setIsResultModalOpen(false);
      startGame(WORDS);
    }
  }

  function closeModal() {
    setIsResultModalOpen(false);
  }

  function startGame(words: Challenge[]) {
    if (words.length === 0) return null;
    //const index = Math.floor(Math.random() * words.length);
    //const randomWord = words[index];
    setChallenge(words[2]);

    setScore(0);
    setLetter("");
    setLettersUsed([]);
    setWordGuess("");
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

  function handleLetterSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    handleConfirm();
  }

  function handleWordSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!challenge) return;

    const guess = wordGuess.trim().toUpperCase();
    const correct = challenge.word.toUpperCase();

    if (!guess) {
      return alert("Digite uma palavra!");
    }

    if (guess === correct) {
      const uniqueLetters = Array.from(new Set(correct.split("")));

      const allCorrectLetters = uniqueLetters.map((letter) => ({
        value: letter,
        correct: true,
      }));

      setLettersUsed(allCorrectLetters);

      endGame("win");
    } else {
      endGame("lose");
    }

    setWordGuess("");
  }

  function endGame(result: GameStatus) {
    setResult(result);
    setIsResultModalOpen(true);
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

      if (lettersUsed.length === maxAttempts) {
        endGame("lose");
      }
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [score, lettersUsed.length, challenge, maxAttempts]);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={maxAttempts}
          onRestart={handleRestartGame}
        />

        <Tips tips={challenge.tips} />
        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase(),
            );
            return (
              <Letter
                key={index}
                value={isWin ? letter : letterUsed?.value}
                color={
                  isWin
                    ? "correct"
                    : letterUsed?.correct
                      ? "correct"
                      : "default"
                }
              />
            );
          })}
        </div>

        <GuessForm
          formTitle={"Digite sua letra:"}
          maxLength={1}
          placeholder={""}
          value={letter}
          onValueChange={setLetter}
          disabled={result !== null}
          onSubmit={handleLetterSubmit}
          autoFocus={true}
        />

        <GuessForm
          formTitle={"Chutar palavra:"}
          maxLength={challenge.word.length}
          placeholder={"Digite a palavra correta: (1 chance)"}
          value={wordGuess}
          onValueChange={setWordGuess}
          disabled={result !== null}
          onSubmit={handleWordSubmit}
          inputSize="full"
          autoFocus={false}
        />
        <div className={styles.lettersUsedContainer}>
          <h5>Letras utilizadas</h5>
          <LettersUsed data={lettersUsed} />
        </div>
      </main>
      {result !== null && isResultModalOpen && (
        <GameResult
          challenge={challenge}
          attempts={lettersUsed.length}
          status={result}
          maxAttempts={maxAttempts}
          wrongAttempts={wrongAttempts}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
