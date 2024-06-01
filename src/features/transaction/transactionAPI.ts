import axiosInstance from "../../utils/axios";

export const getTransactionsAPI = async () => {
  const response = await axiosInstance.get("/transactions");

  return response.data;
};

export const addTransactionAPI = async (data: any) => {
  const response = await axiosInstance.post("/transactions", data);
  return response.data;
};

export const updateTransactionAPI = async (id: any, data: any) => {
  const response = await axiosInstance.put(`/transactions/${id}`, data);

  return response.data;
};

export const deleteTransactionAPI = async (id: any) => {
  const response = axiosInstance.delete(`/transactions/${id}`);

  return true;

  // return response.data;
};
