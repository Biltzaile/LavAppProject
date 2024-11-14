import { useThemeSync } from "./hooks/useThemeSync";
import { MainRouter } from "./routers";

function App() {
  useThemeSync()

  return <MainRouter />;
}

export default App;