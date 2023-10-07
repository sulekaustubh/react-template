import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

const Signup = () => {
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		name: '',
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
				`https://kaustubh-blog-backend.onrender.com/api/v1/user/register`,
				{
					username: inputs.name,
					email: inputs.email,
					password: inputs.password,
				}
			);
			// agar signup properly ho jata hai then pop an alert
			if (data.success) {
				alert(`Hi ${data?.user.username}, welcome to Scribbles! `);
				navigate('/login');
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
		// 			<h1 className=" font-bold text-2xl tracking-wider">
		// 				Create your account
		// 			</h1>
		// 			<input
		// 				required
		// 				type={'text'}
		// 				className="border-2 tracking-wider border-gray-700 rounded-xl p-2 w-60"
		// 				placeholder="Enter a valid username"
		// 				value={inputs.name}
		// 				onChange={handleChange}
		// 				name="name"
		// 			/>
		// 			<input
		// 				required
		// 				type={'email'}
		// 				className="border-2 tracking-wider border-gray-700 rounded-xl p-2 w-60"
		// 				placeholder="Enter your email"
		// 				value={inputs.email}
		// 				name="email"
		// 				onChange={handleChange}
		// 			/>

		// 			<input
		// 				required
		// 				type={'password'}
		// 				className="border-2 tracking-wider border-gray-700 rounded-xl p-2 w-60"
		// 				placeholder="Set your password"
		// 				value={inputs.password}
		// 				name="password"
		// 				onChange={handleChange}
		// 			/>

		// 			<button
		// 				type="submit"
		// 				className="border-2 border-black rounded-xl p-2 tracking-widest px-4 hover:text-blue-400 duration-300 bg-gray-900 text-white font-bold text-base"
		// 			>
		// 				Join Scribbles
		// 			</button>
		// 		</div>
		// 	</form>
		// 	<div className="flex items-center justify-center pt-8">
		// 		<div className="space-y-4">
		// 			<div>
		// 				<div className="tracking-wider">Already have one ?</div>
		// 				<div className="tracking-wider">
		// 					Let's get you logged in.
		// 				</div>
		// 			</div>
		// 			<div className="">
		// 				<Link
		// 					to="/login"
		// 					className="border-2 border-black rounded-lg p-2 tracking-widest px-4 hover:text-blue-400 duration-300 bg-gray-900 text-white font-bold text-base"
		// 				>
		// 					Login
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
						Join Scribbles!
					</Typography>
				</CardHeader>
				<CardBody className="flex flex-col ">
					<div className="tracking-widest space-y-8">
						<Input
							required
							label="Name"
							type="text"
							size="lg"
							value={inputs.name}
							name="name"
							onChange={handleChange}
						/>
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
						Sign up
					</Button>
					<Typography
						variant="small"
						className="mt-6 tracking-widest flex justify-center"
					>
						Already have an account?
						<Link
							to="/login"
							as="a"
							variant="small"
							color="blue-gray"
							className="ml-1 font-bold"
						>
							Login
						</Link>
					</Typography>
				</CardFooter>
			</Card>
		</form>
	);
};

export default Signup;
