import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
  const [searchParams] = useSearchParams();

  // get params from url
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return [lat, lng];
}

// this is a custom hook get position from the url
