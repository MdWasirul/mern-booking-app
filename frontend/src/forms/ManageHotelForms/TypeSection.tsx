import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import type { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl mt-4">Type:</h2>
      <div className="grid grid-cols-4 gap-4">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-700 text-white font-semibold border rounded-full px-4 py-2 shadow-lg shadow-blue-500 break-words text-center"
                : "cursor-pointer bg-gray-300 font-semibold border rounded-full px-4 py-2 shadow-lg shadow-gray-600 break-words text-center"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
              className="hidden"
            />
            <span className="">{type}</span>
          </label>
        ))}
      </div>
      {errors.city && (
        <span className="text-red-500">{errors.city.message}</span>
      )}
    </div>
  );
};
export default TypeSection;
