import { useDispatch, useSelector } from "react-redux";
import { initGame, quitGame, selectGameStatus } from "../state/gameSlice";

function Status() {
	const gameStatus = useSelector(selectGameStatus);
	const dispatch = useDispatch();

	let message = "";
	switch (gameStatus) {
		case "idle":
			message = "Click start to start the game";
			break;
		case "ongoing":
			message = "Click on a card to draw";
			break;
		case "won":
			message = "Game Over";
			break;
		case "lost":
			message = "Game Over";
			break;
		default:
			break;
	}

	let buttonContent;
	if (gameStatus === "idle") {
		buttonContent = "Start";
	} else if (gameStatus === "ongoing") {
		buttonContent = "Restart";
	} else {
		buttonContent = "Retry";
	}

	return (
		<div className="status">
			<div className="gameStatusMessage">
				<p className="statusText">{message}</p>
				<span className="statusButtons">
					<button
						onClick={() => {
							dispatch(initGame());
						}}
					>
						{buttonContent}
					</button>
					{gameStatus === "ongoing" && (
						<button onClick={() => dispatch(quitGame())}>Quit</button>
					)}
				</span>
			</div>
		</div>
	);
}

export default Status;
