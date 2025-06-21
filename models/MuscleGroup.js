import mongoose from "mongoose";

const MuscleGroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.models.MuscleGroup ||
  mongoose.model("MuscleGroup", MuscleGroupSchema);
