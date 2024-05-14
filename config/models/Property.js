import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
    },
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    square_feet: { type: Number, required: true },
    amenities: [{ type: String }],
    rates: {
      nightly: { type: Number },
      weekly: { type: Number },
      monthly: { type: Number },
    },
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [{ type: String }],
    is_featured: { type: Boolean, defaults: false },
  },
  { timestamps: true }
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
