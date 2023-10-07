import React, { useState } from 'react';

function AuthComponent() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loggedInUser, setLoggedInUser] = useState(null);

	// Function to handle sign-up
	const handleSignUp = () => {
		// Check if the user already exists in local storage
		const users = JSON.parse(localStorage.getItem('users')) || [];

		// Check if the email is already registered
		if (users.some((user) => user.email === email)) {
			alert('Email is already registered.');
			return;
		}

		// Add the new user to the list of users
		users.push({ email, password });
		localStorage.setItem('users', JSON.stringify(users));

		alert('Sign-up successful. You can now log in.');
	};

	// Function to handle login
	const handleLogin = () => {
		const users = JSON.parse(localStorage.getItem('users')) || [];

		const user = users.find(
			(user) => user.email === email && user.password === password
		);

		if (user) {
			setLoggedInUser(user.email);
			setEmail('');
			setPassword('');
		} else {
			alert('Invalid email or password.');
		}
	};

	// Function to handle logout
	const handleLogout = () => {
		setLoggedInUser(null);
	};

	return (
		<div>
			{loggedInUser ? (
				<div>
					<p>You are logged in as: {loggedInUser}</p>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div>
					<h2>Sign Up</h2>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={handleSignUp}>Sign Up</button>

					<h2>Login</h2>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={handleLogin}>Login</button>
				</div>
			)}
		</div>
	);
}

export default AuthComponent;
