import { useEffect, useState } from 'react';
const KEY = 'cd139f75';
//callback = handleCloseMovie(); we pass from App component
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(
    function () {
      callback?.(); //callback = handleCloseMovie();
      const controller = new AbortController();
      async function fetchMovies() {
        setIsLoading(true);
        setError('');

        try {
          const res = await fetch(
            `https://www.omdbapi.com/?s=${query}}&apikey=${KEY}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await res.json();
          if (data.Response === 'False') throw new Error('Movie not found');

          setMovies(data.Search);
          setError('');
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
