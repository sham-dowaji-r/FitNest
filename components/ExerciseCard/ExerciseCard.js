import styled from "styled-components";

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px gray;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  max-width: 360px;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px orange;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Info = styled.p`
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: #333;
`;

const Instructions = styled.ul`
  list-style: disc;
  padding-left: 1.25rem;
  font-size: 0.9rem;
  color: #555;
`;

const Instruction = styled.li`
  margin-bottom: 0.4rem;
`;
export default function ExerciseCard({ exercise }) {
  return (
    <Card>
      <Image
        src={
          exercise.imageUrl?.trim()
            ? exercise.imageUrl
            : "https://source.unsplash.com/400x200/?exercise"
        }
        alt={exercise.name}
      />
      <Content>
        <Title>{exercise.name}</Title>
        <Info>
          {exercise.sets} sets × {exercise.reps} reps
        </Info>
        <Instructions>
          {exercise.instructions?.map((step, idx) => (
            <Instruction key={idx}>{step}</Instruction>
          ))}
        </Instructions>
      </Content>
    </Card>
  );
}
