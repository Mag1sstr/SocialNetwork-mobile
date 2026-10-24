import { Route, Routes, useLocation } from "react-router-dom";
import NavLayout from "./NavLayout";
import FeedPage from "../pages/FeedPage";
import AllChatsPage from "../pages/AllChatsPage";
import { AnimatePresence, motion } from "motion/react";
import SingleChatPage from "../pages/SingleChatPage";
import ProfilePage from "../pages/ProfilePage";
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};
function AppRouter() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<NavLayout />}>
          <Route
            index
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <FeedPage />
              </motion.div>
            }
          />

          <Route path="/group" element={<div>G</div>} />
          <Route
            path="/chat"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <AllChatsPage />
              </motion.div>
            }
          />
          <Route
            path="/profile"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ProfilePage />
              </motion.div>
            }
          />
        </Route>
        <Route
          path="/chat/:id"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SingleChatPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRouter;
