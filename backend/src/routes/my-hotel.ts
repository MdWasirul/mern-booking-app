import express, { Request, Response } from "express";
const router = express.Router();
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/my-hotel";
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

//api/my-hotels
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price Per Night is required and must be a Number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const newHotel: HotelType = req.body;
      const imageFiles = req.files as Express.Multer.File[];

      //1.upload image to cloudinary

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        const dataURI = `data:${image.mimetype};base64,${b64}`;
        const uploadRes = await cloudinary.v2.uploader.upload(dataURI);
        return uploadRes.url;
      });
      //2.if successful then add url to new hotel
      const imageUrls = await Promise.all(uploadPromises);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      //3.save the new Hotels in our Database
      const hotel = new Hotel(newHotel);
      await hotel.save();
      //4.return a 200 status
      res.status(201).send(hotel);
    } catch (e) {
      console.log("error Creating hotel: ", e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotel" });
  }
});

//edit-hotel based on id
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  // /api/my-hotels/984594859
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotel" });
  }
});
router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      // Separate images from other fields
      const { imageUrls, ...rest } = req.body as HotelType;

      // Update non-image fields first
      let hotel = await Hotel.findOneAndUpdate(
        { _id: req.params.hotelId, userId: req.userId },
        { $set: { ...rest, lastUpdated: new Date() } },
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      // Handle new file uploads (if any)
      const files = req.files as Express.Multer.File[];
      const newImageUrls = await uploadImages(files);

      // Merge old + new images
      hotel.imageUrls = [...newImageUrls, ...(imageUrls || [])];

      await hotel.save();

      res.status(200).json(hotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// Utility function: Upload multiple images to Cloudinary
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  return Promise.all(uploadPromises);
}

export default router;
