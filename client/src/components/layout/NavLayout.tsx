import { NavLink, Outlet } from "react-router-dom";

function NavLayout() {
  const links = [
    {
      name: "Лента",
      icon: "/icons/feed.svg",
      activeIcon: "/icons/feed-a.svg",
      path: "/",
    },
    {
      name: "Группы",
      icon: "/icons/group.svg",
      activeIcon: "/icons/group-a.svg",
      path: "/group",
    },
    {
      name: "Чаты",
      icon: "/icons/chat.svg",
      activeIcon: "/icons/chat-a.svg",
      path: "/chat",
    },
    {
      name: "Профиль",
      icon: "/icons/profile.svg",
      activeIcon: "/icons/profile-a.svg",
      path: "/profile",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
      <footer className="grid grid-cols-4 mt-auto text-[14px] pb-6 pt-3.25 px-3.5 text-(--text) border-t border-(--border)">
        {links.map((link) => (
          <NavLink
            to={link.path}
            key={link.name}
            draggable={false}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1.25 select-none transition-all [&>p]:transition-all active:scale-90 [&>img]:transition-all ${isActive && "[&>img]:bg-(--active) [&>p]:text-(--prime)"}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <img
                    src={link.activeIcon}
                    alt="icon"
                    className="py-1.25 px-3 rounded-2xl select-none"
                    draggable={false}
                  />
                ) : (
                  <img
                    src={link.icon}
                    alt="icon"
                    className="py-1.25 px-3 rounded-2xl select-none"
                    draggable={false}
                  />
                )}
                <p>{link.name}</p>
              </>
            )}
          </NavLink>
        ))}
      </footer>
    </div>
  );
}

export default NavLayout;
