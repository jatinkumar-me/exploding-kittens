import { useDispatch, useSelector } from "react-redux";
import { selectGameStatus } from "../state/gameSlice";
import { useEffect } from "react";
import {
   changeUser,
	incrementNoOfGamesPlayed,
	incrementScore,
	selectCurrentScore,
	selectCurrentUserId,
	selectNoOfGamesPlayed,
} from "../state/userSlice";

function Score() {
	const gameStatus = useSelector(selectGameStatus);
	const score = useSelector(selectCurrentScore);
	const noOfGamesPlayed = useSelector(selectNoOfGamesPlayed);
	const currentUserId = useSelector(selectCurrentUserId);
	const dispatch = useDispatch();

	const updateScore = async () => {
		try {
         const reqBody = {entityId: currentUserId, score, noOfGamesPlayed};
         if(gameStatus === "won") {
            reqBody.score++;
         }
         reqBody.noOfGamesPlayed++;

			const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reqBody),
			});
         const user = await response.json();
         dispatch(changeUser(user));
		} catch (error) {
         console.log(error);
      }
	};

	useEffect(() => {
		if (gameStatus === "won" || gameStatus === "lost") {
			dispatch(incrementNoOfGamesPlayed());
			if (gameStatus === "won") {
				dispatch(incrementScore());
			}
			if (currentUserId) updateScore();
		}
	}, [gameStatus]);
	return (
		<div className="currentScore">
			<span>Score: {score}</span>
			<span>Games Played: {noOfGamesPlayed}</span>
		</div>
	);
}

export default Score;
