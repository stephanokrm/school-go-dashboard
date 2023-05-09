import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";

export const useUserDestroyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(["UserDestroy"], async (id: number) => {
    await axios.delete(`/api/user/${id}`);
    await queryClient.invalidateQueries(["getUsers"]);
    await queryClient.invalidateQueries(["getUserById", id]);
  });
};
