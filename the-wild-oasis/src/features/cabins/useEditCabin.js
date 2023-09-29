import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin has successfully updated');
      queryClient.invalidateQueries({ queryKey: ['cabins'] }); // when we create a new  cabin we need cabins to be reFetched again so we invalidate it and it will get data from supaBase
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
