'use client';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // hydration mismatch 방지
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <button className='header-icon' onClick={toggleTheme}>
      {theme === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </button>
  );
};

export default ThemeToggle;
