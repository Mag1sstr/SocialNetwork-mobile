import { useState } from "react";
import AppRouter from "./components/layout/AppRouter";
import Load from "./components/layout/Load";
import AuthPage from "./components/pages/AuthPage";

function App() {
  const [screen, setScreen] = useState<"load" | "auth" | "app">("load");
  return (
    <>
      {screen === "load" && <Load onComplete={() => setScreen("auth")} />}
      {screen === "auth" && <AuthPage onSuccess={() => setScreen("app")} />}
      {screen === "app" && <AppRouter />}
    </>
  );
}

export default App;
