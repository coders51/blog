import { useState, useEffect } from "react";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  function handleClick() {
    if (darkMode) {
      document.documentElement.classList.add(
        "transition-colors",
        "duration-300"
      );
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDarkMode(false);
    } else {
      document.documentElement.classList.add(
        "dark",
        "transition-colors",
        "duration-300"
      );
      localStorage.theme = "dark";
      setDarkMode(true);
    }
  }

  return (
    <div className="absolute right-10">
      <button
        className="transition duration-300 hover:scale-110"
        aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        onClick={handleClick}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};

export default DarkModeToggle;
