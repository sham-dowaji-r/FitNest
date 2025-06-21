import styled from "styled-components";
import ExerciseCard from "../ExerciseCard/ExerciseCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export default function ExerciseList({ exercises }) {
  return (
    <Grid>
      {exercises.map((exercise, index) => (
        <ExerciseCard key={index} exercise={exercise} />
      ))}
    </Grid>
  );
}
