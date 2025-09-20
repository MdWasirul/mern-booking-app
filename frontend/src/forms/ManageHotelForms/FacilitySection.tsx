import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import type { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <fieldset
      className="mt-5"
      aria-describedby={errors.facilities ? "facilities-error" : undefined}
    >
      <legend className="text-2xl font-bold">Facilities</legend>
      <div className="grid grid-cols-4 gap-4 mt-2">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="text-sm flex items-center gap-1 text-gray-700 cursor-pointer"
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) =>
                  facilities?.length > 0 || "At least one facility is required",
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-600 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </fieldset>
  );
};
export default FacilitiesSection;
