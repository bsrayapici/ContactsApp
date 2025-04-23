
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://65b36193770d43aba479a2f2.mockapi.io/users';

export const useContacts = () => {
  return useQuery(['contacts'], async () => {
    const { data } = await axios.get(BASE_URL);
    return data;
  });
};

export const useContactDetails = (id) => {
  return useQuery(['contact', id], async () => {
    const { data } = await axios.get(`${BASE_URL}/${id}`);
    return data;
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => axios.delete(`${BASE_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
    },
  });
};

export const useAddContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contact) => axios.post(BASE_URL, contact),
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
    },
  });
};
