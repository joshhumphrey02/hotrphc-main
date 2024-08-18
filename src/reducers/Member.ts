import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserData } from '@/app/(users)/_components/query';

// Define the initial state using that type
const initialState: Partial<UserData> = {};

export const storeSlice = createSlice({
	name: 'Member',
	initialState,
	reducers: {
		updateMember: (state, action: PayloadAction<Partial<UserData>>) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { updateMember } = storeSlice.actions;

export default storeSlice.reducer;
