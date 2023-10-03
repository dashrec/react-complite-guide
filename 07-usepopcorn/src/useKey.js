import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          /*    onCloseMovie(); */
          action?.();
        }
      }

      document.addEventListener('keydown', callback);

      return function () {
        // as soon as the movie details components unmounts we remove event listener from the document to avoid accumulation
        document.removeEventListener('keydown', callback);
      };
    },
    [action, key]
  );
}
