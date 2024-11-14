import { useThemeSync } from "./hooks/useThemeSync";

function App() {
  useThemeSync()

  return (
    <div>
      <h1>Bienvenido a LavApp</h1>
    </div>
  );
}

export default App;