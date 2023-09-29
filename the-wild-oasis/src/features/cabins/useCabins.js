import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'], // query identifier
    queryFn: getCabins,
  });

  return { isLoading, error, cabins };
}

// fetch cabins
