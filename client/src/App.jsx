import "./App.css";

import Game from "./Components/Game";
import Leaderboard from "./Components/Leaderboard";
import Navbar from "./Components/Navbar";

function App() {
	const content = (
		<div className="app">
			<Navbar />
			<div className="app-playfield">
				<Game />
				<Leaderboard />
			</div>
		</div>
	);
	return content;
}
export default App;
