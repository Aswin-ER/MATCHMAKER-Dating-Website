import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserCred {
  name: string;
  email: string;
  picture: string;
}

export interface UserState {
  userCred: UserCred | null;
}

const initialState: UserState = {
  userCred: null,
};

export const userSlice = createSlice({
  name: 'userCred',
  initialState,
  reducers: {
    userDet: (state, action: PayloadAction<UserCred | null>) => {
      console.log(action.payload, 'user payload');
      state.userCred = action.payload;
    },
  },
});

export const { userDet } = userSlice.actions;
export default userSlice.reducer;
