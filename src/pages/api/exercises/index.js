import dbConnect from "../../../../lib/mongodb";
import Exercis from "../../../../models/Exercise";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const exercises = await Exercis.find().populate("muscleGroups").lean();
    return res.status(200).json(exercises);
  }
  if (req.method === "POST") {
    const { name, imageUrl, instructions, muscleGroups } = req.body;
    const exercise = await Exercis.create({
      name,
      imageUrl,
      instructions,
      muscleGroups,
    });
    return res.status(201).json(exercise);
  }
  res.status(405).end();
}
