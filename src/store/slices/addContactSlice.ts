import { ContactType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ContactType = {
  firstName: "",
  lastName: "",
  age: 0,
  photo: ""
};

export const addContactSlice = createSlice({
  name: 'addContact',
  initialState,
  reducers: {
    setFirstName: (state, { payload }: { payload: Partial<ContactType>; }) => {
      state.firstName = payload.firstName ?? "";
    },
    setLastName: (state, { payload }: { payload: Partial<ContactType>; }) => {
      state.lastName = payload.lastName ?? "";
    },
    setAge: (state, { payload }: { payload: Partial<ContactType>; }) => {
      state.age = payload.age ?? 0;
    },
    setPhoto: (state, { payload }: { payload: Partial<ContactType>; }) => {
      state.photo = payload.photo ?? "";
    },
    removeDraft: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setFirstName, setLastName, setAge, setPhoto, removeDraft } = addContactSlice.actions;

export default addContactSlice.reducer;