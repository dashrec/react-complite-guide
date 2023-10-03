import { useQuiz } from './contexts/QuizContext';

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;
  return (
    <div>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            onClick={() => dispatch({ type: 'newAnswer', payload: index })} // set cur index as answer
            className={`btn btn-option ${index === answer ? 'answer' : ''}
            ${
              hasAnswered
                ? index === question.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            key={option}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
