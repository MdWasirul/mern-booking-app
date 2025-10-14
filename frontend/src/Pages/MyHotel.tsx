import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BiMap } from "react-icons/bi";
import { LuHotel } from "react-icons/lu";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TbBed } from "react-icons/tb";
import { BiStar } from "react-icons/bi";

const MyHotel = () => {
  const {
    data: hotelData,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetchMyHotel"],
    queryFn: apiClient.fetchMyHotel,
  });
  //Loading state
  if (isLoading) return <p className="text-gray-700 text-2xl">Loading...</p>;
  //Error state
  if (isError)
    return (
      <p className="text-red-600 text-2xl">Error:{(error as Error).message}</p>
    );
  //Empty data state
  if (!hotelData || hotelData.length === 0)
    return <span className="text-red-600 text-2xl">No Found Hotel!</span>;
  //Render hotel list
  return (
    <div className="space-y-5 ">
      <span className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">MyHotels</h1>
        <Link
          to="/add-hotel"
          className=" flex font-bold text-xl bg-blue-700 text-white p-2 hover:bg-blue-700"
        >
          AddHotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-6 ">
        {hotelData.map((hotel, index) => (
          <div
            key={index}
            className="flex flex-col justify-between border border-slate-400 p-4 rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-2 gap-4 break-words">
              <div className="border border-slate-700 px-4 py-2 flex items-center ">
                <BiMap className="mr-1 text-2xl text-white" />
                {hotel.city},{hotel.country}
              </div>
              <div className="border border-slate-700 px-4 py-2 flex items-center ">
                <LuHotel className="mr-1 text-2xl text-white" />
                {hotel.type}
              </div>
              <div className="border border-slate-700 px-4 py-2 flex items-center ">
                <RiMoneyRupeeCircleLine className="mr-1 text-2xl text-white" />
                {hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-700 px-4 py-2 flex items-center ">
                <TbBed className="mr-1 text-2xl text-white" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-700 px-4 py-2 flex items-center ">
                <BiStar className="mr-1 text-2xl text-white" />
                {hotel.starRating} Start rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className=" flex font-bold text-xl bg-blue-700 text-white p-2 hover:bg-blue-700"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyHotel;
