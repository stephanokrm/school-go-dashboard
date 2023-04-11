import axios from "../../axios";
import { Driver, RawDriver, Resource } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { driverToRawDriver } from "../../maps/driverToRawDriver";
import { UseFormSetError } from "react-hook-form";
import { DriverStoreFieldValues } from "../../../pages/dashboard/motoristas/cadastrar";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Response = Resource<RawDriver>;
type SuccessResponse = AxiosResponse<Response>;
interface UseDriverStoreMutation {
  setError: UseFormSetError<DriverStoreFieldValues>;
}

export const useDriverStoreMutation = ({
  setError,
}: UseDriverStoreMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, DriverStoreFieldValues>(
    async (driver) => {
      return axios().post<Response, SuccessResponse>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/driver`,
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
        await router.push("/dashboard/motoristas");
      },
    }
  );
};
