import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitySection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImageSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  starRating: number;
  pricePerNight: number;
  facilities: string[];
  imageFiles: FileList;
};
type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    //Create a new formData & call our API
    console.log("JSON data from react-hook-form:", formDataJson);
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formDataJson.facilities.forEach((facility) => {
      formData.append("facilities", facility);
    });
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
    console.log("--- FormData contents being sent to API ---");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log("-----------------------------------------");
    onSave(formData);
  });
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <DetailSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImageSection />
        <span className="flex justify-end g">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 p-4 border rounded-lg cursor-pointer hover:bg-blue-800 transition duration-300 text-white disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
