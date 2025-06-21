import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  exercises: [
    {
      exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
      sets: Number,
      reps: Number,
    },
  ],
});

// ✅ استخدم اسم collection صريح "worksout"
export default mongoose.models.Workout ||
  mongoose.model("Workout", WorkoutSchema, "worksout");
