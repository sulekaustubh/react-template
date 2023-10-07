import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Checkbox,
	Button,
} from '@material-tailwind/react';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	// state and input ke updates
	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	// yeh function call hoga when submit button is clicked
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// POST request mei API endpoint & payload send hoga
			const { data } = await axios.post(
				`https://kaustubh-blog-backend.onrender.com/api/v1/user/login`,
				{
					email: inputs.email,
					password: inputs.password,
				}
			);
			// agar login properly ho jata hai then pop an alert
			if (data.success) {
				localStorage.setItem('userId', data?.user._id);
				dispatch(authActions.login());
				alert(`Welcome back, ${data?.user.username} `);
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		// <div>
		// 	<form
		// 		className="register flex flex-col mt-14 gap-10 items-center justify-center"
		// 		onSubmit={handleSubmit}
		// 	>
		// 		<div className="border-[3px] flex flex-col gap-10 p-14 px-32 rounded-xl border-gray-700">
		// 			<h1 className="tracking-wider font-bold text-2xl">
		// 				Welcome back
		// 			</h1>

		// 			<input
		// 				required
		// 				type={'email'}
		// 				className="border-2 tracking-wider border-gray-700 rounded-xl p-2 w-60"
		// 				placeholder="Enter your email"
		// 				value={inputs.email}
		// 				name="email"
		// 				margin="normal"
		// 				onChange={handleChange}
		// 			/>
		// 			<input
		// 				required
		// 				type={'password'}
		// 				className="border-2 tracking-wider border-gray-700 rounded-xl p-2 w-60"
		// 				placeholder="Enter your password"
		// 				value={inputs.password}
		// 				name="password"
		// 				margin="normal"
		// 				onChange={handleChange}
		// 			/>

		// 			<button
		// 				type="submit"
		// 				className="border-2 border-black rounded-xl p-2 tracking-widest px-4 hover:text-blue-400 duration-300 bg-gray-900 text-white font-bold text-base"
		// 			>
		// 				Login
		// 			</button>
		// 		</div>
		// 	</form>
		// 	<div className="flex items-center justify-center pt-8">
		// 		<div className="space-y-4">
		// 			<div>
		// 				<div className="tracking-wider">
		// 					Don't have an account ?
		// 				</div>
		// 				<div className="tracking-wider">
		// 					Let's get you signed up.
		// 				</div>
		// 			</div>
		// 			<div className="">
		// 				<Link
		// 					to="/signup"
		// 					className="border-2 border-black rounded-lg p-2 tracking-widest px-4 hover:text-blue-400 duration-300 bg-gray-900 text-white font-bold text-base"
		// 				>
		// 					Join Scribbles
		// 				</Link>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		<form
			onSubmit={handleSubmit}
			className=" flex place-content-center my-28"
		>
			<Card className="w-96">
				<CardHeader
					variant="gradient"
					color="gray"
					className="mb-4 grid h-28 place-items-center"
				>
					<Typography
						variant="h3"
						color="white"
						className="tracking-widest"
					>
						Welcome!
					</Typography>
				</CardHeader>
				<CardBody className="flex flex-col ">
					<div className="tracking-widest space-y-8">
						<Input
							required
							label="Email"
							type="email"
							size="lg"
							value={inputs.email}
							name="email"
							onChange={handleChange}
						/>
						<Input
							required
							type="password"
							label="Password"
							size="lg"
							value={inputs.password}
							name="password"
							onChange={handleChange}
						/>
					</div>
				</CardBody>
				<CardFooter className="pt-2 space-y-8">
					<Button
						type="submit"
						variant="gradient"
						fullWidth
						className="tracking-widest"
					>
						Login
					</Button>
					<Typography
						variant="small"
						className="mt-6 tracking-widest flex justify-center"
					>
						Don&apos;t have an account?
						<Link
							to="/signup"
							as="a"
							variant="small"
							color="blue-gray"
							className="ml-1 font-bold"
						>
							Signup
						</Link>
					</Typography>
				</CardFooter>
			</Card>
		</form>
	);
};

export default Login;
