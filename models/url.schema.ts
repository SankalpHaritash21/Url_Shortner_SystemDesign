import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user", // Reference to the User schema
      required: true, // Ensure every URL is associated with a user
    },
  },
  { timestamps: true }
);

const Url = models?.url || model("url", UserSchema);

export default Url;
