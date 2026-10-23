import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface LoadProps {
  onComplete?: () => void;
}

export default function Load({ onComplete }: LoadProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1550);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(14px)",
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#070912] text-white"
        >
          {/* Background glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0.2, 0.55, 0.35],
              scale: [0.8, 1.15, 1],
            }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]"
          />

          {/* Logo and title */}
          <div className="relative flex flex-col items-center">
            {/* Animated ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
              animate={{
                opacity: [0, 0.8, 0.45],
                scale: [0.7, 1.12, 1],
                rotate: 0,
              }}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute -inset-5 rounded-[32px] border border-blue-400/30 shadow-[0_0_45px_rgba(59,130,246,0.12)]"
            />

            {/* Logo */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.55,
                y: 18,
                rotate: -8,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex h-20 w-20 items-center justify-center"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59,130,246,0.12)",
                    "0 0 45px rgba(59,130,246,0.32)",
                    "0 0 20px rgba(59,130,246,0.12)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-[26px] border border-white/10 bg-white/[0.04] backdrop-blur-xl"
              />

              <motion.img
                src="/icons/logo.svg"
                alt="Logo"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.45 }}
                className="relative z-10 h-12 w-12 object-contain"
              />
            </motion.div>

            {/* App name */}
            <motion.div
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.25,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-7 text-center"
            >
              <h1 className="text-2xl font-semibold tracking-[0.18em]">
                NetStudy
              </h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.45, duration: 0.45 }}
                className="mx-auto mt-3 h-px w-16 origin-center bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              />
            </motion.div>

            {/* Minimal loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="mt-6 flex items-center gap-1.5"
            >
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={{
                    opacity: [0.25, 1, 0.25],
                    scale: [0.8, 1.15, 0.8],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: dot * 0.15,
                    ease: "easeInOut",
                  }}
                  className="h-1 w-1 rounded-full bg-blue-400"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
