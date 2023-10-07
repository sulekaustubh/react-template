import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';
import Login from './Login';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Home = () => {
	const authState = useSelector((state) => state.authReducer);
	const { isLoggedIn } = authState;

	useEffect(() => {
		document.title = authState.isLoggedIn
			? `${authState.user.name}'s tasks`
			: 'Task Manager';
	}, [authState]);

	return (
		<>
			<MainLayout>
				{!isLoggedIn ? (
					<div className="tracking-wider text-gray-800 h-[40vh] py-8 text-center">
						<div>
							<LoginForm />
						</div>
						{/* <h1 className="text-4xl font-bold"> Features:</h1>
						<div className='grid mb-10 space-y-4 font-semibold py-4 text-2xl'>
							<span className="">
								● SignUp/Login using email and password
							</span>
							<span className="">
                ● Perform CRUD operations on tasks
							</span>
            </div> */}

						{/* <Link
							to="/signup"
							className="border-[3px] border-blue-400 rounded-2xl py-1 px-4 font-semibold text-2xl"
						>SIGNUP
							<span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
						</Link> */}
					</div>
				) : (
					<>
						<h1 className="text-lg tracking-wider text-gray-800 font-semibold mt-8 mx-8 border-b-2 border-b-gray-400">
							Tasks added by: {authState.user.name}
						</h1>
						<Tasks />
					</>
				)}
			</MainLayout>
		</>
	);
};

export default Home;
