interface IProps {
  img?: string;
  userImg?: string;
}
function PostCard({ img, userImg }: IProps) {
  return (
    <article className="max-w-full bg-(--card-bg) p-3.5 border border-(--border) rounded-[18px] mx-4 mb-3.5">
      <div className=" flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <img
            className="w-10 h-10 rounded-full"
            src={userImg || "/user.jpg"}
            alt=""
          />
          <div>
            <p>Аня Ковалёва</p>
            <p>12 мин</p>
          </div>
        </div>
        <button>
          <img src="/icons/more.svg" alt="" />
        </button>
      </div>
      <p className="mb-2.5 ">
        Вчера дошли до смотровой на Воробьёвых — идеальный закат и наконец-то
        без курсовой в голове 🌇
      </p>
      <img
        className="w-full rounded-[14px] object-cover bg-black h-[190px] mb-3.5"
        src={img || "/z.jpg"}
        alt=""
      />
      <div className="flex justify-between text-(--text) text-sm">
        <button className="flex gap-1.5 items-center">
          <img src="/icons/like.svg" alt="" />
          <p>0</p>
        </button>
        <button className="flex gap-1.5 items-center">
          <img src="/icons/comments.svg" alt="" />
          <p>0</p>
        </button>
        <button className="flex gap-1.5 items-center">
          <img src="/icons/share.svg" alt="" />
          <p>0</p>
        </button>
        <button>
          <img src="/icons/save.svg" alt="" />
        </button>
      </div>
    </article>
  );
}

export default PostCard;
