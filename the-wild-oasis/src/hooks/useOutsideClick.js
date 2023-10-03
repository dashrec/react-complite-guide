import { useEffect, useRef } from 'react';

// listening in the capturing phase, which is where the event goes from the DOM onto the target element,
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        // if click is not on opened window than close the window
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener('click', handleClick, listenCapturing); //listenCapturing = listen event as event moves down the tree and not up the dom tree
      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
// when we click on openWindow btn it closes immediately because of outside click was detected
