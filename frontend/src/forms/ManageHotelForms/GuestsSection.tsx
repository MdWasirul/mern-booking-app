import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h1 className="text-2xl font-bold mt-4 ">Guests:</h1>
      <div className="grid grid-cols-2 gap-5 p-6 mt-2 bg-gray-300">
        <label className="text-gray-700 font-semibold text-sm">
          Adult
          <input
            type="number"
            min={1}
            className="px-4 py-2 border rounded-md w-full"
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-700 font-semibold text-sm">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 font-semibold text-sm">
          Children
          <input
            type="number"
            min={0}
            className="px-4 py-2 border rounded-md w-full"
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount?.message && (
            <span className="text-red-700 font-semibold text-sm">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
export default GuestsSection;
