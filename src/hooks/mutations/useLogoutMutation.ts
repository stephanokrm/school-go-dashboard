import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useFormMutation } from "./useFormMutation";
import axios from "../../lib/axios";

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation(async () => {
    try {
      await axios.post(`/logout`);
    } catch (e) {}

    await queryClient.clear();
    await queryClient.invalidateQueries(["getUserByMe"]);
    await router.push("/login");
  });
};
