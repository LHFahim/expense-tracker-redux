import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransactionAPI,
  deleteTransactionAPI,
  getTransactionsAPI,
  updateTransactionAPI,
} from "./transactionAPI";

export enum TransactionTypeEnum {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface ITransaction {
  id: number;
  name: string;
  amount: number;
  type: TransactionTypeEnum;
}

export interface ITransactionState {
  transactions: ITransaction[];
  isLoading: boolean;
  isError: boolean;
  error: string;
}

const transactionIntialState: ITransactionState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchTransactionsAsync = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const response = await getTransactionsAPI();
    return response;
  }
);

export const createTransactionAsync = createAsyncThunk(
  "transaction/createTransaction",
  async (data: any) => {
    const response = await addTransactionAPI(data);
    return response;
  }
);

export const updateTransactionAsync = createAsyncThunk(
  "transaction/updateTransaction",
  async ({ id, data }: any) => {
    const response = await updateTransactionAPI(id, data);
    console.log("🚀 ~ response:", response);
    return response;
  }
);

export const deleteTransactionAsync = createAsyncThunk(
  "transaction/deleteTransaction",
  async (id: number) => {
    const response = await deleteTransactionAPI(id);
    return response;
  }
);
const transactionSlice = createSlice({
  name: "transaction",
  initialState: transactionIntialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "Something went wrong";
        state.transactions = [];
      })
      .addCase(createTransactionAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTransactionAsync.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransactionAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "Something went wrong";
      })
      .addCase(updateTransactionAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateTransactionAsync.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;

        const indexToUpdate = state.transactions.findIndex(
          (t: any) => t.id === action.payload.id
        );

        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(updateTransactionAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "Something went wrong";
      })
      .addCase(deleteTransactionAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(deleteTransactionAsync.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;

        state.transactions = state.transactions.filter(
          (t: any) => t.id !== action.payload
        );
      })
      .addCase(deleteTransactionAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "Something went wrong";
      });
  },
});

export const transactionReducer = transactionSlice.reducer;
