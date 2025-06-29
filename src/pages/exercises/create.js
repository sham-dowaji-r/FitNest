import { useRouter } from "next/router";
import ExerciseForm from "../../../components/ExerciseForm/ExerciseForm";

export default function CreateExercise({ muscleOptions }) {
  const router = useRouter();
  const { workoutId, workoutSlug } = router.query;

  const handleSubmit = async (data) => {
    const res = await fetch("/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newExercise = await res.json();

    if (workoutId) {
      await fetch(`/api/workouts/${workoutId}/add-exercise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: newExercise._id,
          sets: 3,
          reps: 10,
        }),
      });

      router.push(`/workouts/${workoutId}`);
    } else {
      router.push("/");
    }
  };

  return <ExerciseForm onSubmit={handleSubmit} muscleOptions={muscleOptions} />;
}

export async function getServerSideProps(context) {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/muscle-groups`);
  const contentType = res.headers.get("content-type");

  if (!res.ok || !contentType.includes("application/json")) {
    console.error("Invalid response:", await res.text());
    return { props: { muscleOptions: [] } };
  }

  const muscleOptions = await res.json();

  return {
    props: {
      muscleOptions,
    },
  };
}
