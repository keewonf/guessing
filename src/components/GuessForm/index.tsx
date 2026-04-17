import { Input } from "../Input";
import { Button } from "../Button";
import styles from "./styles.module.css";

type GuessFormProps = {
  value: string;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  maxLength: number;
  placeholder: string;
  disabled: boolean;
  formTitle: string;
  onValueChange: (value: string) => void;
  autoFocus?: boolean;
  inputSize?: "default" | "full";
};

export function GuessForm({
  value,
  onSubmit,
  maxLength,
  placeholder,
  disabled,
  formTitle,
  onValueChange,
  autoFocus,
  inputSize = "default",
}: GuessFormProps) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onValueChange(value);
  }

  return (
    <form className={styles.guessForm} onSubmit={onSubmit}>
      <h4>{formTitle}</h4>
      <div className={styles.guess}>
        <Input
          inputSize={inputSize}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          autoFocus={autoFocus}
        />
        <Button type="submit" disabled={disabled}>
          Confirmar{" "}
        </Button>
      </div>
    </form>
  );
}
