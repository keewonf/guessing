import { Header } from "./components/Header";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.container}>
      <main>
        <Header />
        <h1>Hello World!</h1>
      </main>
    </div>
  );
}

export default App;
