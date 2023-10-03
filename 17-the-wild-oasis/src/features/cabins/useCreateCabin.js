import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] }); // when we create a new  cabin we need cabins to be reFetched again so we invalidate it and it will get data from supaBase
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
