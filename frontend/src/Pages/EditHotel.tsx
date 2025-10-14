import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const {
    data: hotel,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchBYHotelId", hotelId], // include hotelId in key for caching
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId, //only run if hotelId exists
  });
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateMyHotelById,
    onSuccess: async () => {
      showToast({ message: "Hotel Saved!", type: "Success" });
    },
    onError: () => {
      showToast({ message: "Erro Saving Hotel", type: "Error" });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
 
  if (isLoading) return <p>Loading........</p>;
  if (isError) return <p>Error Fetching Hotel</p>;

  return (
    <>
      <ManageHotelForm
        hotel={hotel}
        onSave={handleSave}
        isLoading={isPending}
      />
    </>
  );
};
export default EditHotel;
