import { useEffect, useState } from "react";
import {
  getContracts,
  createContract,
  updateContract,
  deleteContract,
} from "../services/contract-service";
import { Contract as ContractType } from "../types/contract";

const useContracts = () => {
  const [contracts, setContracts] = useState<ContractType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      try {
        const contractsData = await getContracts();
        setContracts(contractsData);
      } catch (error) {
        setError("Failed to fetch contracts.");
        console.error("Error fetching contracts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, []);

  const create = async (contract: ContractType) => {
    try {
      const newContract = await createContract(contract);
      setContracts((prevContracts) => [...prevContracts, newContract]);
    } catch (error) {
      setError("Failed to create contract.");
      console.error("Error creating contract:", error);
    }
  };

  const update = async (id: number, contract: ContractType) => {
    try {
      await updateContract(id, contract);
      setContracts((prevContracts) =>
        prevContracts.map((c) => (c.id === id ? { ...c, ...contract } : c))
      );
    } catch (error) {
      setError("Failed to update contract.");
      console.error("Error updating contract:", error);
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteContract(id);
      setContracts((prevContracts) => prevContracts.filter((c) => c.id !== id));
    } catch (error) {
      setError("Failed to delete contract.");
      console.error("Error deleting contract:", error);
    }
  };

  return {
    contracts,
    loading,
    error,
    create,
    update,
    remove,
  };
};

export default useContracts;
