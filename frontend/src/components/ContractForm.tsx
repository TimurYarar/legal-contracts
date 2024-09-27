import React from "react";
import styled from "styled-components";
import { Contract } from "../types/contract";

interface ContractFormProps {
  formData: Contract;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (contract: Contract) => Promise<void>;
  resetForm: () => void;
  isUpdate: boolean;
}

const ContractForm: React.FC<ContractFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  resetForm,
  isUpdate,
}) => {
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(formData);
    resetForm();
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <Label>Author:</Label>
      <Input
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
        required
      />
      <Label>Entity Name:</Label>
      <Input
        name="entityName"
        value={formData.entityName}
        onChange={handleChange}
        placeholder="Entity Name"
        required
      />
      <Label>Description:</Label>
      <TextArea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <Input
        type="date"
        name="createdAt"
        value={formData.createdAt.split("T")[0]}
        onChange={handleChange}
        required
        readOnly={isUpdate}
      />
      <Button type="submit">{isUpdate ? "Update" : "Create"} Contract</Button>
    </FormContainer>
  );
};

export default ContractForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Label = styled.p`
  text-align: left;
  font-weight: 700;
  margin-bottom: 6px;
`;
