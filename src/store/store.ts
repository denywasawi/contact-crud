import { configureStore } from '@reduxjs/toolkit';
import addContactReducer from "./slices/addContactSlice";
import editContactReducer from "./slices/editContactSlice";

export const store = configureStore({
  reducer: {
    addContact: addContactReducer,
    editReducer: editContactReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;