import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";

export const useResponsibleDestroyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(["ResponsibleDestroy"], async (id: number) => {
    await axios.delete(`/api/user/${id}`);
    await queryClient.invalidateQueries(["getUserById", id]);
    await queryClient.invalidateQueries(["getUsers"]);
    await queryClient.invalidateQueries(["getResponsibles"]);
  });
};
