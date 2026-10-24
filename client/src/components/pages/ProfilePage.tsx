import { useState } from "react";

function ProfilePage() {
  const [tabs, setTabs] = useState<"all" | "groups" | "personal">("all");

  return (
    <>
      <header className="px-4 py-3.5 flex items-center justify-between">
        <h1 className="font-semibold">Профиль</h1>
        <button>
          <img src="/icons/menu.svg" alt="" />
        </button>
      </header>
      <div className="flex flex-col items-center gap-2.5 px-11.25 mb-3.5">
        <img
          src="/user.jpg"
          width={92}
          height={92}
          className="rounded-full"
          alt=""
        />
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold">Марина Соловьёва</p>
          <p className="text-(--prime) text-sm">@marina.sol</p>
        </div>
        <p className="text-center text-xs">
          Веб-разработка, 3 курс. Фотографирую город по вечерам, собираю
          плейлисты и командные проекты.
        </p>
      </div>
      <div className="flex justify-between px-4.5 py-3.75 rounded-2xl border border-(--border) bg-(--card-bg) max-w-full mx-4">
        <div className="flex flex-col items-center">
          <p className="font-bold">48</p>
          <p className="text-xs text-(--text)">публикаций</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">48</p>
          <p className="text-xs text-(--text)">публикаций</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">48</p>
          <p className="text-xs text-(--text)">публикаций</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 py-3 px-4 text-(--text) [&>button]:transition-all [&>button]:p-[8px_14px_8px_14px] [&>button]:bg-[#19243A] [&>button]:text-xs [&>button]:rounded-[19px]">
        <button
          className={
            tabs === "all"
              ? "border border-(--prime) text-(--prime) bg-(--prime)/18"
              : "border border-transparent"
          }
          onClick={() => setTabs("all")}
        >
          Все
        </button>
        <button
          className={
            tabs === "personal"
              ? "border border-(--prime) text-(--prime) bg-(--prime)/18"
              : "border border-transparent"
          }
          onClick={() => setTabs("personal")}
        >
          Личные
        </button>
        <button
          className={
            tabs === "groups"
              ? "border border-(--prime) text-(--prime) bg-(--prime)/18"
              : "border border-transparent"
          }
          onClick={() => setTabs("groups")}
        >
          Групповые
        </button>
      </div>
    </>
  );
}

export default ProfilePage;
