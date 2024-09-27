import axios from "axios";
import { Contract } from "../types/contract";

const API_URL = "http://localhost:5000/api/contracts";

export const getContracts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createContract = async (contract: Contract) => {
  const response = await axios.post(API_URL, contract);
  return response.data;
};

export const updateContract = async (id: number, contract: Contract) => {
  const response = await axios.put(`${API_URL}/${id}`, contract);
  return response.data;
};

export const deleteContract = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
