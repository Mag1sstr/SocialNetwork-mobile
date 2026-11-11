import { useEffect, useState } from "react";
import AppRouter from "./components/layout/AppRouter";
import Load from "./components/layout/Load";
import AuthPage from "./components/pages/AuthPage";
import { useGetMeQuery } from "./api/api";

function App() {
  const [screen, setScreen] = useState<"load" | "auth" | "app">("load");
  const { data, isSuccess } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess) {
      setScreen("app");
    }
  }, [isSuccess]);
  return (
    <>
      {screen === "load" && <Load onComplete={() => setScreen("auth")} />}
      {screen === "auth" && !isSuccess && (
        <AuthPage onSuccess={() => setScreen("app")} />
      )}
      {screen === "app" && <AppRouter />}
    </>
  );
}

export default App;
