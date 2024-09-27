import styled from "styled-components";
import { Contract as ContractType } from "../types/contract";
import Button from "./Button";

interface ContractProps {
  contract: ContractType;
  onDelete: () => void;
  onEdit: () => void;
}

const Contract: React.FC<ContractProps> = ({ contract, onDelete, onEdit }) => {
  return (
    <ContractItem>
      <h2>{contract.entityName}</h2>
      <p>Author: {contract.author}</p>
      <p>Description: {contract.description}</p>
      <p>Created At: {contract.createdAt}</p>
      {contract.updatedAt && <p>Updated At: {contract.updatedAt}</p>}
      <Button onClick={onEdit}>Edit</Button>
      <Button onClick={onDelete}>Delete</Button>
    </ContractItem>
  );
};

export default Contract;

const ContractItem = styled.li`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;
