import { useSelector } from "react-redux";
import { selectInventory } from "../state/gameSlice";

function Inventory() {
	const inventory = useSelector(selectInventory);
	const shuffle = `🙅‍♂️ ✕ ${inventory.defuse}`;
	const cat = `😸 ✕ ${inventory.cat}`;

	return <div className="inventory">
      <span>{shuffle}</span>
      <span>{cat}</span>
   </div>;
}

export default Inventory;
