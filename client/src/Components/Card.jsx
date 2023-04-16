import { useRef, useState, useEffect } from "react";

function Card({ onDraw, id, type, isClickable }) {
	const [isHidden, setIsHidden] = useState(true);
	const ref = useRef(null);

	useEffect(() => {
		const handleClick = () => {
			element.removeEventListener("click", handleClick);
			setIsHidden(false);
			onDraw(id, type);
		};
		const element = ref.current;
      if(isClickable){
         element.addEventListener("click", handleClick);
      }
		return () => {
			element.removeEventListener("click", handleClick);
		};
	}, [isClickable]);

	let content;
	if (isHidden) content = "❓";
	else {
		switch (type) {
			case "cat":
				content = "😼";
				break;
			case "defuse":
				content = "🙅‍♂️";
				break;
			case "bomb":
				content = "💣";
				break;
			case "shuffle":
				content = "🔃";
				break;
			default:
				content = "❓";
		}
	}
	return (
		<span className={`card ${isHidden ? "hidden" : "notHidden"}`} ref={ref}>
			<h2 className="cardContent">{content}</h2>
		</span>
	);
}

export default Card;
