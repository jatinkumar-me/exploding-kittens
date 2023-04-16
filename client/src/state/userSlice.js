import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
	entityId: null,
	username: `RandomPlayer${Math.floor(Math.random() * 1000)}`,
	score: 0,
	noOfGamesPlayed: 0,
};

const userSlice = createSlice({
	name: "user",
	initialState: initialUserState,
	reducers: {
		changeUser: (state, action) => action.payload,
		incrementScore: (state) => {
			state.score += 1;
		},
		incrementNoOfGamesPlayed: (state) => {
			state.noOfGamesPlayed += 1;
		},
	},
});

export const { incrementNoOfGamesPlayed, incrementScore, changeUser } =
	userSlice.actions;
	
export default userSlice.reducer;
export const selectCurrentUser = (state) => state.user.username;
export const selectCurrentScore = (state) => state.user.score;
export const selectNoOfGamesPlayed = (state) => state.user.noOfGamesPlayed;
export const selectCurrentUserId = (state) => state.user.entityId;
