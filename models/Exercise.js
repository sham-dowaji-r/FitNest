import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  instructions: [String],
  muscleGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "MuscleGroup" }],
});

export default mongoose.models?.Exercise ||
  mongoose.model("Exercise", ExerciseSchema);
