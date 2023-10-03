import { useEffect } from 'react';
import { useQuiz } from './contexts/QuizContext';

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  // turn seconds in min and sec
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      // setInterval will call the function we pass in here in every couple of mil secs.
      const id = setInterval(function () {
        dispatch({ type: 'tick' });
      }, 1000);

      return () => clearInterval(id); // clear timer after unmount
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}: {seconds < 10 && '0'}
      {seconds}
    </div>
  );
}

export default Timer;
