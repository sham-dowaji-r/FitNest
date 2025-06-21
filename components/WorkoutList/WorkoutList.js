import styled from "styled-components";
import WorkoutCard from "../WorkoutCard/WorkoutCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export default function WorkoutList({ workouts }) {
  return (
    <Grid>
      {workouts.map((w) => (
        <WorkoutCard key={w._id} workout={w} />
      ))}
    </Grid>
  );
}
