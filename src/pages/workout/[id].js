import dbConnect from "../../../lib/mongodb";
import Workout from "../../../models/Workout";
import Exercise from "../../../models/Exercise";
import ExerciseList from "../../../components/ExerciseList/ExerciseList";
import styled from "styled-components";

const Container = styled.main`
  padding: 2rem;
  max-width: 1200px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export default function WorkoutDetail({ workout }) {
  const exercisesWithSets = workout.exercises.map((ex) => ({
    ...ex.exerciseId,
    sets: ex.sets,
    reps: ex.reps,
  }));

  return (
    <Container>
      <Title>{workout.name}</Title>
      <ExerciseList exercises={exercisesWithSets} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  await dbConnect();

  const workout = await Workout.findById(id)
    .populate("exercises.exerciseId")
    .lean();

  const serialized = {
    ...workout,
    _id: workout._id.toString(),
    exercises: workout.exercises.map((ex) => ({
      ...ex,
      exerciseId: {
        ...ex.exerciseId,
        _id: ex.exerciseId._id.toString(),
        muscleGroups:
          ex.exerciseId.muscleGroups?.map((m) => m.toString()) || [],
      },
    })),
  };

  return {
    props: {
      workout: serialized,
    },
  };
}
