import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";

const Form = styled.form`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  color: #000;
`;

const TextArea = styled.textarea`
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  color: #000;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #f90;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #e67e00;
  }
`;

export default function ExerciseForm({
  initialData = null,
  onSubmit,
  muscleOptions = [],
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [instructions, setInstructions] = useState(
    initialData?.instructions?.join("\n") || ""
  );
  const [muscleGroups, setMuscleGroups] = useState(
    initialData?.muscleGroups || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      imageUrl,
      instructions: instructions
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      muscleGroups,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>اسم التمرين:</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} required />

      <Label>رابط الصورة:</Label>
      <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

      <Label>التعليمات:</Label>
      <TextArea
        rows={5}
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="اكتب كل خطوة في سطر"
      />

      <Label>المجموعات العضلية:</Label>
      <Select
        isMulti
        options={muscleOptions.map((m) => ({
          value: m._id,
          label: m.name,
        }))}
        value={muscleOptions
          .filter((m) => muscleGroups.includes(m._id))
          .map((m) => ({ value: m._id, label: m.name }))}
        onChange={(selected) => {
          setMuscleGroups(selected.map((s) => s.value));
        }}
      />

      <Button type="submit">حفظ</Button>
    </Form>
  );
}
