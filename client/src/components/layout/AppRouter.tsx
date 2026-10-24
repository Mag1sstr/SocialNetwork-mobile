import { Route, Routes } from "react-router-dom";
import NavLayout from "./NavLayout";
import FeedPage from "../pages/FeedPage";
import AllChatsPage from "../pages/AllChatsPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<NavLayout />}>
        <Route index element={<FeedPage />} />

        <Route path="/group" element={<div>G</div>} />
        <Route path="/chat" element={<AllChatsPage />} />
        <Route path="/profile" element={<div>P</div>} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
