import React, { useState } from "react";
import ContractForm from "./ContractForm";
import { Contract as ContractType } from "../types/contract";
import useContracts from "../hooks/useContracts";
import styled from "styled-components";
import Contract from "./Contract";

const ContractList: React.FC = () => {
  const { contracts, loading, error, create, update, remove } = useContracts();
  const [currentContract, setCurrentContract] = useState<ContractType | null>(
    null
  );
  const [formData, setFormData] = useState<ContractType>({
    author: "",
    entityName: "",
    description: "",
    createdAt: new Date().toISOString().split("T")[0],
  });

  const handleCreate = async (contract: ContractType) => {
    await create(contract);
    resetForm();
  };

  const handleUpdate = async (contract: ContractType) => {
    if (currentContract) {
      await update(currentContract.id!, {
        ...contract,
        updatedAt: new Date().toISOString().split("T")[0],
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      author: "",
      entityName: "",
      description: "",
      createdAt: new Date().toISOString().split("T")[0],
    });
    setCurrentContract(null);
  };

  const handleEdit = (contract: ContractType) => {
    setCurrentContract(contract);
    setFormData(contract);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <ListContainer>
      <h1>Legal Contracts</h1>
      <ContractForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={currentContract ? handleUpdate : handleCreate}
        resetForm={resetForm}
        isUpdate={!!currentContract}
      />
      {loading && <p>Loading contracts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ContractsContainer>
        {contracts.map((contract) => (
          <Contract
            key={contract.id}
            contract={contract}
            onEdit={() => handleEdit(contract)}
            onDelete={() => remove(contract.id!)}
          />
        ))}
      </ContractsContainer>
    </ListContainer>
  );
};

export default ContractList;

const ListContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  padding: 20px;
  box-sizing: border-box;
  @media (min-width: 800px) {
    width: 60%;
  }
`;

const ContractsContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
