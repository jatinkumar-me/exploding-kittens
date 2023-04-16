import Deck from "./Deck";
import Status from "./Status";
import Inventory from "./Inventory";
import Score from "./Score";

function Game() {
	return (
		<section className="game">
			<div className="topBar">
				<Score />
				<Inventory />
			</div>
			<Deck />
			<Status />
		</section>
	);
}

export default Game;
