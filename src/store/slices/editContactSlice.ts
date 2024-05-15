import { ContactType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ContactType = {
  firstName: "",
  lastName: "",
  age: 0,
  photo: ""
};

export const editContactSlice = createSlice({
  name: 'editContact',
  initialState,
  reducers: {
    setContactData: (state, { payload }: { payload: Partial<ContactType>; }) => {
      state.id = payload.id ?? "";
      state.firstName = payload.firstName ?? "";
      state.lastName = payload.lastName ?? "";
      state.age = payload.age ?? 0;
      state.photo = payload.photo ?? "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setContactData } = editContactSlice.actions;

export default editContactSlice.reducer;