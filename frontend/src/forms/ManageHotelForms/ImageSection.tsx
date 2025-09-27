import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageUrls");
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };
  return (
    <div>
      <h1 className="text-2xl font-bold  mb-2">Images</h1>
      <div className="flex flex-col gap-4 border p-5">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-6">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img
                  src={url}
                  alt="HotelImg"
                  className="min-h-full object-cover"
                />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="text-gray-700 cursor-pointer  "
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + existingImageUrls?.length || 0;
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
