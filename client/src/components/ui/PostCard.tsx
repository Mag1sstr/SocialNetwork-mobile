function PostCard() {
  return (
    <article className="max-w-full bg-(--card-bg) p-3.5 border border-(--border) rounded-[18px] mx-4">
      <div className=" flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <img className="w-10 h-10 rounded-full" src="" alt="" />
          <div>
            <p>Аня Ковалёва</p>
            <p>12 мин</p>
          </div>
        </div>
      </div>
      <p className="mb-2.5 ">
        Вчера дошли до смотровой на Воробьёвых — идеальный закат и наконец-то
        без курсовой в голове 🌇
      </p>
      <img className="w-full rounded-[14px] bg-black h-[190px]" src="" alt="" />
      <div className="flex justify-between">
        <button>
          <img src="/icons/like.sbg" alt="" />
        </button>
      </div>
    </article>
  );
}

export default PostCard;
