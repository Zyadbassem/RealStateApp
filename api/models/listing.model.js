import mongoose from "mongoose";

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: { type: Number },
    type: {
      type: String,
      enum: ["apartment", "house", "villa", "commercial", "land"],
      required: true,
    },
    photos: [
      {
        url: {
          type: String,
        },
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    sold: {
      type: Boolean,
      default: false,
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("listing", listingSchema);

export default Listing;
