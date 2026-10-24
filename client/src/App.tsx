import { useState } from "react";
import AppRouter from "./components/layout/AppRouter";
import Load from "./components/layout/Load";

function App() {
  const [screen, setScreen] = useState<"load" | "auth" | "app">("app");
  return (
    <>
      {screen === "load" && <Load onComplete={() => setScreen("app")} />}
      {/* {screen === "auth" && <AuthPage onSuccess={() => setScreen("app")} />} */}
      {screen === "app" && <AppRouter />}
    </>
  );
}

export default App;
