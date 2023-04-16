import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialGameState = {
	deck: [],
	inventory: {},
	gameStatus: "idle",
};

const gameSlice = createSlice({
	name: "game",
	initialState: initialGameState,
	reducers: {
		initGame: (state) => {
			state.deck = createDeck();
			state.inventory = {defuse: 0, cat: 0};
			state.gameStatus = "ongoing"
		},
		quitGame: () => initialGameState,
		drawCard: (state, action) => {
			const { id: cardId, type } = action.payload;

			switch (type) {
				case "cat":
					state.inventory.cat++;
					break;
				case "defuse":
					state.inventory.defuse++;
					break;
				case "shuffle":
					state.deck = createDeck();
					return;
				case "bomb": {
					if (state.inventory.defuse && state.inventory.defuse > 0) {
						state.inventory.defuse--;
					} else {
						state.gameStatus = "lost";
						return;
					}
					break;
				}
				default:
					break;
			}
			state.deck = state.deck.filter(({ id }) => id !== cardId);
			if (!state.deck.length) state.gameStatus = "won";
		},
	},
});

function createDeck() {
	const deck = [];
	// We can change the number of cat and bomb to increase/decrease the difficulty of the game.
	const cards = ["cat", "cat", "cat", "cat", "defuse", "shuffle", "bomb"];
	for (let i = 0; i < 4; i++) {
		const index = Math.floor(Math.random() * cards.length);
		const id = uuid();
		deck.push({ id, type: cards[index] });
		cards.splice(index, 1);
	}
	return deck;
}
export const { initGame, quitGame, drawCard } = gameSlice.actions;
export default gameSlice.reducer;

export const selectDeck = (state) => state.game.deck;
export const selectInventory = (state) => state.game.inventory;
export const selectGameStatus = (state) => state.game.gameStatus;
