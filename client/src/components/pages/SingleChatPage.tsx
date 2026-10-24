import { useNavigate } from "react-router-dom";

function SingleChatPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-dvh">
      <header className="p-3.5 flex items-center border-b border-(--border) mb-4">
        <button onClick={() => navigate(-1)} className="mr-2.5">
          <img src="/icons/left.svg" alt="" />
        </button>
        <div className="flex gap-2.5 items-center flex-1">
          <img className="w-9 h-9 rounded-full" src="/user.jpg" alt="" />
          <div>
            <p>Аня Ковалёва</p>
            <p className="text-xs text-[#5FD8A0]">В сети</p>
          </div>
        </div>
        <div className="flex gap-2.5 items-center">
          <button>
            <img src="/icons/phone.svg" alt="" />
          </button>
          <button>
            <img src="/icons/more-vertical.svg" alt="" />
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-3">
        <div className="flex items-end gap-2">
          <img
            src="/user.jpg"
            alt=""
            width={26}
            height={26}
            className="rounded-full"
          />
          <div className="flex flex-col max-w-[212px]">
            <p className="bg-(--card-bg) px-3.25 py-2.5 rounded-2xl rounded-tl-sm mb-1">
              Привет! Ты уже посмотрел задание по вебу?
            </p>
            <p className="text-(--text) text-xs">12:18</p>
          </div>
        </div>
      </main>

      <footer className="mt-auto p-3 pb-5.75 border-t border-(--border) flex gap-2.5">
        <button>
          <img src="/icons/plus.svg" alt="" />
        </button>
        <div className="bg-(--card-bg) border border-(--border) flex-1 py-2.75 px-3.5 rounded-[19px] flex gap-2.5">
          <input
            className="text-white w-full outline-none"
            type="text"
            placeholder="Сообщение…"
          />
          <div className="flex items-center gap-2.5  shrink-0">
            <button>
              <img src="/icons/img.svg" alt="" />
            </button>
            <button>
              <img src="/icons/smile.svg" alt="" />
            </button>
            <button className="w-7.5 h-7.5 rounded-full flex items-center justify-center bg-(--prime)">
              <img src="/icons/send.svg" alt="" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SingleChatPage;
