import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

export function useUser() {
  // get user from react query cache or getCurrentUser from supabase
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser, // getCurrentUser returns user
  });

  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' }; // if user?.role === 'authenticated' is true than isAuthenticated will be true
}
