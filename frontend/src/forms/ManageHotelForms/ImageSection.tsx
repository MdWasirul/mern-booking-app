import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h1 className="text-2xl font-bold  mb-2">Images</h1>
      <div className="flex flex-col gap-4 border p-5">
        <input
          type="file"
          multiple
          accept="image/*"
          className="text-gray-700 cursor-pointer  "
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) {
                return "At least One image should be required";
              }
              if (totalLength > 5) {
                return "Total length of images cannot  be more than 5";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 font-semibold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};
export default ImageSection;
