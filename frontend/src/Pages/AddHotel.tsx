import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isPending } = useMutation({
    //Sets isPending=true & Calls API function

    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      // Sets isPending=false
      showToast({ message: "Hotel Saved!", type: "Success" });
    },
    onError: () => {
      showToast({
        message: "Error saving Hotel",
        type: "Error",
      });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <>
      <ManageHotelForm onSave={handleSave} isLoading={isPending} />
    </>
  );
};
export default AddHotel;
