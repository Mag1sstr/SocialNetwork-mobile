import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type AuthMode = "login" | "register";

interface AuthPageProps {
  onSuccess?: (data: { username: string }) => void;
}

export default function AuthPage({ onSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("register");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const isRegister = mode === "register";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const cleanUsername = username.trim();

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(cleanUsername)) {
      setError("Ник: 3–20 символов, латиница, цифры и _");
      return;
    }

    if (password.length < 8) {
      setError("Пароль должен содержать минимум 8 символов");
      return;
    }

    // Здесь подключается API регистрации или входа.
    onSuccess?.({ username: cleanUsername });
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError("");
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-(--prime-bg) px-5 py-10 text-white">
      {/* Фоновое свечение */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-(--prime)/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]" />

      <motion.section
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[390px]"
      >
        {/* Логотип и название */}
        <div className="mb-9 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-[25px] border border-(--border) bg-(--card-bg) shadow-[0_0_50px_rgba(100,120,255,0.12)]"
          >
            <img
              src="/icons/logo.svg"
              alt="Логотип"
              className="h-12 w-12 object-contain"
            />
          </motion.div>

          <h1 className="text-[27px] font-semibold tracking-tight">
            Net Study
          </h1>

          <p className="mt-2 text-sm text-(--text)">
            Твоё пространство. Твои люди.
          </p>
        </div>

        {/* Форма */}
        <div className="rounded-[28px] border border-(--border) bg-(--card-bg)/80 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-7">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              {isRegister ? "Создать аккаунт" : "С возвращением"}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-(--text)">
              {isRegister
                ? "Придумай уникальный ник и присоединяйся."
                : "Введи свои данные, чтобы продолжить."}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 rounded-xl border border-(--border) bg-(--prime-bg) p-1">
            <button
              type="button"
              onClick={() => changeMode("login")}
              className={`rounded-lg py-2.5 text-sm transition-colors ${
                !isRegister
                  ? "bg-(--active) text-white"
                  : "text-(--text) hover:text-white"
              }`}
            >
              Войти
            </button>

            <button
              type="button"
              onClick={() => changeMode("register")}
              className={`rounded-lg py-2.5 text-sm transition-colors ${
                isRegister
                  ? "bg-(--active) text-white"
                  : "text-(--text) hover:text-white"
              }`}
            >
              Регистрация
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium"
                >
                  Уникальный никнейм
                </label>

                <div className="flex h-12 items-center rounded-xl border border-(--border) bg-(--prime-bg) px-3.5 transition-colors focus-within:border-(--prime)">
                  <span className="mr-2 text-(--text)">@</span>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    required
                    minLength={3}
                    maxLength={20}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="yourname"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-(--text)/50"
                  />
                </div>
                <p className="mt-1.5 text-xs text-(--text)">
                  Латиница, цифры и нижнее подчёркивание
                </p>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Пароль
                </label>

                <div className="flex h-12 items-center rounded-xl border border-(--border) bg-(--prime-bg) px-3.5 transition-colors focus-within:border-(--prime)">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isRegister ? "new-password" : "current-password"
                    }
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Минимум 8 символов"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-(--text)/50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 shrink-0 text-xs text-(--text) transition-colors hover:text-white"
                  >
                    {showPassword ? "Скрыть" : "Показать"}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden text-sm text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="group relative mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-(--prime) text-sm font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
              >
                <span className="relative z-10">
                  {isRegister ? "Создать аккаунт" : "Войти в аккаунт"}
                </span>
                <span className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0" />
              </button>
            </motion.form>
          </AnimatePresence>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-(--text)">
          Только для своего круга.
          <br />
          Общайся, делись и оставайся на связи.
        </p>
      </motion.section>
    </main>
  );
}
