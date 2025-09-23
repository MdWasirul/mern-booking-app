import mongoose from "mongoose";

export type HotelType = {
  _id?: mongoose.Types.ObjectId;
  userId: string;
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
  imageUrls: string[];
  lastUpdated: Date;
};
