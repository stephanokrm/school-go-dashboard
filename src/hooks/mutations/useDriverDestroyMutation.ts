import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";

export const useDriverDestroyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(["DriverDestroy"], async (id: number) => {
    await axios.delete(`/api/user/${id}`);
    await queryClient.invalidateQueries(["getUserById", id]);
    await queryClient.invalidateQueries(["getUsers"]);
    await queryClient.invalidateQueries(["getDrivers"]);
  });
};
