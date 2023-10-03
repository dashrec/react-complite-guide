import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();
// children will be the whole App wrapped inside DarkModeProvider
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches, // sets layout mode in accordance of operation system layout mode of the user meaning if he/she uses dark mode when they visit to page for the first time the mode will also be dark mode
    'isDarkMode'
  ); //isDarkMode is a name of the key in local storage

  useEffect(
    // change class="dark-mode" || "light-mode" of html document
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
// create custom hook
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider'); // in case we use it outside of the area which will not be wrapped inside DarkModeProvider
  return context;
}

export { DarkModeProvider, useDarkMode };
