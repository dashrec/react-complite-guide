import { useState } from 'react';

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}

// MapBox

/* export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=address&access_token=${mapKey}`
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();
  const { city, postcode, address } = convertMapBoxAddressToObject(
    data?.features?.at(0)
  );

  return { city, postcode, address };
}

//Mapping response from MapBox to have consistent data format
function convertMapBoxAddressToObject(mapboxData) {
  const postcode = mapboxData.context.find((item) =>
    item.id.includes('postcode')
  )?.text;
  const city = mapboxData.context.find((item) =>
    item.id.includes('place')
  )?.text;
  const address = mapboxData.place_name.split(',')[0];

  return { city, postcode, address };
}
 */
