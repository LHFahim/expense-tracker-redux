import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { transactionReducer } from "../features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
