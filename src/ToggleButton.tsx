"use client";

import { motion, type Transition } from "framer-motion";
import { useEffect, useState } from "react";

export default function DarkModeSwitch() {
  const [darkMode, setDarkMode] = useState(true);

  // Apply dark mode class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center px-1 cursor-pointer"
      onClick={() => setDarkMode(!darkMode)}
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-white dark:bg-black shadow-md"
        animate={{ x: darkMode ? 32 : 0 }} // slide across
        transition={darkMode ? spring : bounce}
      />
    </div>
  );
}

/**
 * Animations
 */
const bounce: Transition = {
  duration: 0.8,
  ease: bounceEase,
};

const spring: Transition = {
  duration: 0.8,
  ease: bounceEase,
};

/**
 * Bounce easing function
 */
function bounceEase(x: number) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}
