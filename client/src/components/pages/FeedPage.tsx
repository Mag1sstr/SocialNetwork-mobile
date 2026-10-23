import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PostCard from "../ui/PostCard";
function FeedPage() {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <>
      {openSearch && <div className="fixed inset-0 backdrop-blur-xs z-0"></div>}
      <header className="px-4 py-3.25 flex z-0 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {!openSearch ? (
            <motion.img
              key="logo"
              src="/icons/logo.svg"
              alt="logo"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              width={50}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="shrink-0"
            />
          ) : (
            <motion.input
              key="search"
              type="text"
              placeholder="Поиск..."
              autoFocus
              initial={{ opacity: 0, y: -12, width: 0 }}
              animate={{ opacity: 1, y: 0, width: "100%" }}
              exit={{ opacity: 0, y: 12, width: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="min-w-0 flex-1 bg-(--card-bg)  text-white rounded-2xl px-3 py-2 outline-none"
            />
          )}
        </AnimatePresence>
        <div className="flex ml-auto shrink-0">
          <button
            onClick={() => setOpenSearch(!openSearch)}
            className="p-2.5 cursor-pointer "
          >
            {openSearch ? (
              <img src="/icons/close.svg" alt="" />
            ) : (
              <img src="/icons/search.svg" alt="" />
            )}
          </button>
          <button className="p-2.5 cursor-pointer">
            <img src="/icons/bell.svg" alt="" />
          </button>
        </div>
      </header>

      <form className="flex gap-2.5 p-4 items-center">
        <div className="w-9 h-9 rounded-full border border-(--border)"></div>

        <div className="bg-(--card-bg) border border-(--border) flex-1 py-2.75 px-3.5 pr-0 rounded-[19px] flex">
          <input
            className="text-white w-full outline-none"
            type="text"
            placeholder="Что нового?"
          />

          <img className="px-2.75" src="/icons/image.svg" alt="" />
        </div>
      </form>

      <PostCard />
    </>
  );
}

export default FeedPage;
