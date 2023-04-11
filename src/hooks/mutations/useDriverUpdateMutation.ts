import { useQueryClient } from "@tanstack/react-query";
import axios from "../../axios";
import { Driver, RawDriver, Resource } from "../../types";
import { AxiosResponse } from "axios";
import { useFormMutation } from "./useFormMutation";
import { driverToRawDriver } from "../../maps/driverToRawDriver";
import { DriverUpdateFieldValues } from "../../../pages/dashboard/motoristas/[id]/editar";
import { UseFormSetError } from "react-hook-form";
import { useRouter } from "next/router";

type Response = Resource<RawDriver>;
type SuccessResponse = AxiosResponse<Response>;
interface UseDriverUpdateMutation {
  setError: UseFormSetError<DriverUpdateFieldValues>;
}

export const useDriverUpdateMutation = ({
  setError,
}: UseDriverUpdateMutation) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useFormMutation<SuccessResponse, DriverUpdateFieldValues>(
    async (driver) => {
      return axios().post<Response, SuccessResponse>(
        `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/user/${driver.user.id}/driver/${driver.id}`,
        {
          ...(await driverToRawDriver(driver as Driver)),
          _method: "PUT",
        }
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
