import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';

export function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId], // query identifier
    queryFn: () => getBooking(bookingId),
    retry: false, // by default, React Query will try to fetch data three times in case that it fails in the beginning, but in this case not finding the data probably means that it doesn't exist in the first place.
  });

  return { isLoading, error, booking };
}

// fetch individual booking
