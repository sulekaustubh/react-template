import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';
import Input from './utils/Input';
import Loader from './utils/Loader';

const SignupForm = () => {
	const [formErrors, setFormErrors] = useState({});
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [fetchData, { loading }] = useFetch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validateManyFields('signup', formData);
		setFormErrors({});
		if (errors.length > 0) {
			setFormErrors(
				errors.reduce(
					(total, ob) => ({ ...total, [ob.field]: ob.err }),
					{}
				)
			);
			return;
		}

		const config = { url: '/auth/signup', method: 'post', data: formData };
		fetchData(config).then(() => {
			navigate('/login');
		});
	};

	const fieldError = (field) => (
		<p
			className={`mt-1 text-pink-600 text-left text-xs ${
				formErrors[field] ? 'block' : 'hidden'
			}`}
		>
			<i className="mr-2 fa-solid fa-circle-exclamation"></i>
			{formErrors[field]}
		</p>
	);

	return (
		<>
			<form
				className="m-auto tracking-wider my-6 max-w-[450px] p-8 bg-white border-[3px] border-[#222222] shadow-md rounded-2xl">
				{loading ? (
					<Loader />
				) : (
					<>
							<h2
								className="text-center mb-8 text-2xl text-gray-700 font-bold">
							Let's get you signed up!
						</h2>
						<div className="mb-4">
							{/* <label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">Name</label> */}
							<Input
								type="text"
								name="name"
								id="name"
								value={formData.name}
								placeholder="Enter your name"
								onChange={handleChange}
							/>
							{fieldError('name')}
						</div>

						<div className="mb-4">
							{/* <label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">Email</label> */}
							<Input
								type="text"
								name="email"
								id="email"
								value={formData.email}
								placeholder="Enter your email"
								onChange={handleChange}
							/>
							{fieldError('email')}
						</div>

						<div className="mb-4">
							{/* <label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500">Password</label> */}
							<Input
								type="password"
								name="password"
								id="password"
								value={formData.password}
								placeholder="Create a password with atleast 4 characters"
								onChange={handleChange}
							/>
							{fieldError('password')}
						</div>

						<button
							className="tracking-widest mt-4 rounded-xl bg-[#222222] text-gray-100 hover:bg-white hover:text-[#222222] duration-300 hover:border-2 border-2 hover:border-[#222222] border-[#222222] px-4 py-2 font-medium hover:bg-primary-dark"
							onClick={handleSubmit}
						>
							SignUp
						</button>

						<div className="pt-6">
							<Link
								to="/login"
								className="text-blue-400 font-semibold"
							>
								Already have an account? Login here
							</Link>
						</div>
					</>
				)}
			</form>
		</>
	);
};

export default SignupForm;
