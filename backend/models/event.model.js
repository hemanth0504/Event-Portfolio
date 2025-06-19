import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventCategory",
      required: true,
    },

    images: [
      {
        url: { type: String, required: true },
        caption: { type: String },
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
    },

    eventDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
