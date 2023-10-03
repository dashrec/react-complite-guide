import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import StarRating from './StarRating';
const root = ReactDOM.createRoot(document.getElementById('root'));
/* 
function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />;
      <p>The movie war rated {movieRating} start</p>
    </div>
  );
} */

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

{
  /*     <StarRating maxRating={10} /> */
}
{
  /*     <StarRating
      maxRating={5}
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
    />
    <StarRating
      size={64}
      color="black"
      maxRating={10}
      className="test"
      defaultRating={3}
    />

    <Test /> */
}
