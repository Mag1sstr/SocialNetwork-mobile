import { useState } from "react";
import { Link } from "react-router-dom";

function AllChatsPage() {
  const [tabs, setTabs] = useState<"all" | "groups" | "personal">("all");
  return (
    <>
      <header className="p-4 mb-1">
        <h1 className="text-[22px] font-bold">Чаты</h1>
      </header>
      <div className="px-4">
        <div className="flex gap-2.5 items-center">
          <div className="bg-(--card-bg) border border-(--border) flex-1 py-2.75 px-3.5 rounded-[19px] flex gap-2.5">
            <img src="/icons/search.svg" alt="" />

            <input
              className="text-white w-full outline-none"
              type="text"
              placeholder="Поиск по сообщениям"
            />
          </div>
        </div>
        <div className="flex gap-2 py-3 px-4 text-(--text) [&>button]:transition-all [&>button]:p-[8px_14px_8px_14px] [&>button]:bg-[#19243A] [&>button]:rounded-[19px]">
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
      </div>
      <div className="px-4 flex flex-col gap-0.5">
        <Link
          to={"/chat/ef"}
          className="px-1.5 py-2.75 rounded-[14px] flex items-center justify-between gap-2.75 bg-(--card-bg)"
        >
          <div className="flex items-center gap-2.75 min-w-0 flex-1">
            <img
              width={44}
              height={44}
              className="rounded-full"
              src={"/user.jpg"}
              alt=""
            />
            <div className="min-w-0 flex-1">
              <p className="whitespace-nowrap  text-ellipsis overflow-hidden">
                Аня Ковалёва
              </p>
              <p className="whitespace-nowrap  text-ellipsis overflow-hidden">
                Скинула конспект по матану, посмотри
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <p>12:24</p>
            <div className="w-4.5 h-4.5 rounded-full bg-(--prime) "></div>
          </div>
        </Link>
        <div className="px-1.5 py-2.75 rounded-[14px] flex items-center justify-between gap-2.75 bg-(--card-bg)">
          <div className="flex items-center gap-2.75 min-w-0 flex-1">
            <img
              width={44}
              height={44}
              className="rounded-full"
              src={"/user.jpg"}
              alt=""
            />
            <div className="min-w-0 flex-1">
              <p className="whitespace-nowrap  text-ellipsis overflow-hidden">
                Аня Ковалёва
              </p>
              <p className="whitespace-nowrap  text-ellipsis overflow-hidden">
                Скинула конспект по матану, посмотри
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <p>12:24</p>
            <div className="w-4.5 h-4.5 rounded-full bg-(--prime) "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllChatsPage;
