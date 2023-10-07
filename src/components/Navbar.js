import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authActions } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {
	// login ka status redux se import hua
	let isLogin = useSelector((state) => state.isLogin);
	// check if user already logged-in using localStorage
	isLogin = isLogin || localStorage.getItem('userId');

	// redux ka inbuilt function to dispatch actions
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// logout ka logic
	const handleLogout = () => {
		try {
			dispatch(authActions.logout());
			alert('Logged out successfully');
			navigate('/login');
			localStorage.clear();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='border-0 flex place-content-center border-red-400 '>
			<div className="border-0  bg-white/60 backdrop-brightness-125 backdrop-blur-md rounded-full px-6  border-black place-content-center">
				{/* <Link
					to="/"
					className="hover:text-blue-400 ml-4 duration-300 flex items-center tracking-widest text-gray-100 text-xl px-8"
				>
					SCRIBBLES
				</Link> */}

				<div className="flex space-x-4 my-4 font-medium text-gray-800    px-0">
					<Link
						to="/"
						className="hover:text-blue-400 duration-300 flex items-center tracking-widest   text-xl"
					>
						Home
					</Link>
					{isLogin && (
						<div className="flex space-x-4">
							<Link
								to="/collection"
								className=" flex items-center text-xl tracking-wider hover:text-blue-400 duration-300"
							>
								Collection
							</Link>
							<Link
								to="/new-post"
								className="flex items-center text-xl tracking-wider hover:text-blue-400 duration-300"
							>
								New
							</Link>
						</div>
					)}
					{!isLogin && (
						<>
							<Link
								className=" hover:text-blue-400 tracking-wider duration-300 text-xl"
								to="/login"
							>
								Login
							</Link>
							<Link
								className=" hover:text-blue-400 tracking-wider duration-300 text-xl"
								to="/signup"
							>
								Signup
							</Link>
						</>
					)}

					{isLogin && (
						<button
							onClick={handleLogout}
							className="hover:text-blue-500 tracking-wider duration-300 text-xl"
						>
							Logout
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
