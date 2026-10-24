import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

function NavLayout() {
  const location = useLocation();
  const [visible, setVisible] = useState(
    () => !sessionStorage.getItem("loadShown"),
  );

  useEffect(() => {
    if (!visible) {
      return;
    }

    sessionStorage.setItem("loadShown", "true");

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1550);

    return () => clearTimeout(timer);
  }, []);
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
    <div className="flex flex-col h-dvh">
      <div className="relative min-h-0 flex-1 ">
        <div className="h-full overflow-y-auto overscroll-contain">
          <Outlet />
        </div>
        {location.pathname === "/" && (
          <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-16 bg-gradient-to-t from-black/70 to-transparent" />
        )}
      </div>
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
