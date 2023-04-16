import { useDispatch, useSelector } from "react-redux";
import {
	changeUser,
	selectCurrentUser,
	selectCurrentUserId,
} from "../state/userSlice";
import { useState } from "react";

function Form() {
	const currentUser = useSelector(selectCurrentUser);
	const currentUserId = useSelector(selectCurrentUserId);
	const dispatch = useDispatch();
	const [isFormActive, setIsFormActive] = useState(false);
	const [username, setUsername] = useState(currentUser);

	const handleSubmit = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username }),
			});
			const userData = await response.json();
			dispatch(changeUser(userData));
			setIsFormActive(false);
		} catch (error) {}
	};

	return (
		<div className="form">
			<span className="formLabel">
				{`You are currently playing as ${currentUser}`}
				{!currentUserId && ", your score won't be saved."}
			</span>
			<div className="formInput">
				{isFormActive && (
					<>
						<input
							type="text"
							name="username"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<button aria-label="change username" onClick={handleSubmit}>
							Change user
						</button>
					</>
				)}
				<button
					aria-label="show input form"
					onClick={() => setIsFormActive(!isFormActive)}
				>
					{!isFormActive ? "Change user" : "Cancel"}
				</button>
			</div>
		</div>
	);
}

export default Form;
