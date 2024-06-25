import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import { z } from "zod";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Email already exists"],
    },
    password: { type: String, required: [true, "Password is required"] },
    image: { type: String },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property", // reference to the Model
      },
    ],
  },
  { timestamps: true }
);

UserSchema.statics.findAndValidate = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) return false;
  const isValidated = await bcrypt.compare(password, user.password);
  return isValidated ? user : false;
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = models?.User || model("User", UserSchema);

export default User;
