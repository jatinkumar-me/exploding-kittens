import { useDispatch, useSelector } from "react-redux";
import { drawCard, selectDeck, selectGameStatus } from "../state/gameSlice";
import Card from "./Card";
import { useState } from "react";

function Deck() {
	const deck = useSelector(selectDeck);
   const gameStatus = useSelector(selectGameStatus);
   const [isClickable, setIsClickable] = useState(true);
	const dispatch = useDispatch();

	const handleDraw = (id, type) => {
      setIsClickable(false);
      setTimeout(() => {
         dispatch(drawCard({ id, type }));
         setIsClickable(true);
      }, 1500);
	};
   if(gameStatus !== "ongoing")
      return <div className="deck">
			{gameStatus!=="idle" && <h1 className="message">
				{gameStatus === "won" ? "You won 🎉" : "You lost 😿"}
				</h1>}
		</div>
	return (
		<div className="deck">			
			{deck.map(({ id, type }) => (
				<Card key={id} onDraw={handleDraw} id={id} type={type} isClickable={isClickable}/>
			))}
		</div>
	);
}

export default Deck;
