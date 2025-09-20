import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const DetailSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold mb-3">Add Hotel</h2>
      <label className="text-gray-700 text-sm font-bold">
        Name:
        <input
          {...register("name", { required: "This field is required" })}
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <label htmlFor="" className="text-gray-700 text-sm font-bold">
          City:
          <input
            {...register("city", { required: "This field is required" })}
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold">
          Country:
          <input
            {...register("country", { required: "This field is required" })}
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Description:
          <textarea
            rows={10}
            {...register("description", { required: "This field is required" })}
            className="border rounded w-full py-1 px-2 font-normal"
          ></textarea>
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </label>
        <div>
          <label className="text-gray-700 text-sm font-bold ">
            Price Per Night:
            <input
              min={1}
              {...register("pricePerNight", {
                required: "This field is required",
              })}
              type="number"
              className="border rounded w-full py-1 px-2 font-normal"
            ></input>
            {errors.pricePerNight && (
              <span className="text-red-500">
                {errors.pricePerNight.message}
              </span>
            )}
          </label>
        </div>
        <label className="text-gray-700 text-sm font-bold">
          Star Rating:
          <select
            {...register("starRating", { required: "This field is required" })}
            className="border w-full py-2 text-gray-700 font-normal"
          >
            <option value="" className="font-bold text-sm">
              Select as Rating
            </option>

            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500">{errors.starRating.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};
export default DetailSection;
