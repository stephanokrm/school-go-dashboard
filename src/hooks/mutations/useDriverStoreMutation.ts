import axios from "../../lib/axios";
import { Driver, DriverCreateForm, RawDriver, Resource } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { driverToRawDriver } from "../../maps/driverToRawDriver";
import { UseFormSetError } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Response = Resource<RawDriver>;
type SuccessResponse = AxiosResponse<Response>;
interface UseDriverStoreMutation {
  setError: UseFormSetError<DriverCreateForm>;
}

export const useDriverStoreMutation = ({
  setError,
}: UseDriverStoreMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, DriverCreateForm>(
    async (driver) => {
      return axios.post<Response, SuccessResponse>(
        `/api/driver`,
        await driverToRawDriver(driver as Driver)
      );
    },
    {
      setError,
      onSuccess: async (response) => {
        await queryClient.invalidateQueries(["getDrivers"]);
        await queryClient.invalidateQueries([
          "getDriverById",
          response.data.data.id,
        ]);
        await queryClient.invalidateQueries(["getUsers"]);
        await queryClient.invalidateQueries([
          "getUserById",
          response.data.data.user.id,
        ]);
        await router.push("/motoristas");
      },
    }
  );
};
