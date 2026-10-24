import { Link } from "react-router-dom";

function FriendsPage() {
  return (
    <>
      <header className="p-4 font-bold text-[22px]">Друзья</header>
      <div className="flex gap-2.5 items-center mb-3">
        <div className="bg-(--card-bg) border border-(--border) flex-1 py-2.75 px-3.5 rounded-[19px] flex gap-2.5 max-w-full mx-4">
          <img src="/icons/search.svg" alt="" />

          <input
            className="text-white w-full outline-none"
            type="text"
            placeholder="Поиск друзей"
          />
        </div>
      </div>
      <div className="px-4">
        <p className="text-(--text) mb-2.5">Возможно вам знакомы:</p>
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            to={"/chat/ef"}
            className="px-1.5 py-7 rounded-[14px] bg-(--card-bg) flex flex-col gap-2.5 items-center"
          >
            <img
              width={91}
              height={91}
              className="rounded-full"
              src={"/user.jpg"}
              alt=""
            />
            <p className="text-center break-all mb-3">Lorem, ipsum.</p>

            <button className="py-2 px-3 rounded-2xl text-xs bg-(--prime) mt-auto">
              Добавить в друзья
            </button>
          </Link>
          <Link
            to={"/chat/ef"}
            className="px-1.5 py-7 rounded-[14px] bg-(--card-bg) flex flex-col gap-2.5 items-center"
          >
            <img
              width={91}
              height={91}
              className="rounded-full"
              src={"/user.jpg"}
              alt=""
            />
            <p className="text-center break-all mb-3 ">Lorem ipsum dolor</p>

            <button className="py-2 px-3 rounded-2xl text-xs bg-(--prime) mt-auto">
              Добавить в друзья
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default FriendsPage;
