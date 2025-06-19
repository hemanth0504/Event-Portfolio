import mongoose from "mongoose";

const eventCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const EventCategory = mongoose.model("EventCategory", eventCategorySchema);
export default EventCategory;
