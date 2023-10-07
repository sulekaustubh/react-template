import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from 'react-redux';
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';
import { useEffect } from 'react';

const LoginForm = ({ redirectUrl }) => {
	const [formErrors, setFormErrors] = useState({});
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate();

	const authState = useSelector((state) => state.authReducer);
	const { loading, isLoggedIn } = authState;
	const dispatch = useDispatch();

	useEffect(() => {
		if (isLoggedIn) {
			navigate(redirectUrl || '/');
		}
	}, [authState, redirectUrl, isLoggedIn, navigate]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validateManyFields('login', formData);
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
		dispatch(postLoginData(formData.email, formData.password));
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
			<form className="m-auto tracking-wider my-6 max-w-[450px] p-8 bg-white border-[3px] border-[#222222] shadow-md rounded-2xl">
				{/* className='m-auto my-16 max-w-[500px] bg-white p-8 border-2 shadow-md rounded-md'> */}
				{loading ? (
					<Loader />
				) : (
					<>
						<h2 className="text-center mb-8 text-2xl text-gray-700 font-bold">
							Welcome back!
						</h2>
						<div className="mb-4">
							{/* <label
								htmlFor="email"
								className="after:content-['*'] after:ml-0.5 after:text-red-500"
							>
								Email
							</label> */}
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
							{/* <label
								htmlFor="password"
								className="after:content-['*'] after:ml-0.5 after:text-red-500"
							>
								Password
							</label> */}
							<Input
								type="password"
								name="password"
								id="password"
								value={formData.password}
								placeholder="Enter your password"
								onChange={handleChange}
							/>
							{fieldError('password')}
						</div>

						<button
							className="tracking-widest mt-4 rounded-xl bg-[#222222] text-gray-100 hover:bg-white hover:text-[#222222] duration-300 hover:border-2 border-2 hover:border-[#222222] border-[#222222] px-4 py-2 font-medium"
							onClick={handleSubmit}
						>
							Login
						</button>

						<div className="pt-4">
							<Link
								to="/signup"
								className="text-blue-400"
							>
								Don't have an account? Signup here
							</Link>
						</div>
					</>
				)}
			</form>
		</>
	);
};

export default LoginForm;
