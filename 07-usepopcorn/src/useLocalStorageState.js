import { useEffect, useState } from 'react';
// initialState = empty array passed from app and key = watched
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(value)); // add new watched movie to localStorage
    },
    [value, key]
  );

  return [value, setValue];
}
