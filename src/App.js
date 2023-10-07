import Signup from './pages/Signup';
import Collection from './pages/Collection';
import Login from './pages/Login';
import AllPosts from './pages/AllPosts';
import NewPost from './pages/NewPost';
import Navbar from './components/Navbar';
import EditPost from './pages/EditPost';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';

function App() {
	return (
		<>
			<div className="sticky top-2 mb-4 z-50">
				<div className="">
					<Navbar />
				</div>
				{/* <Nav /> */}
			</div>
			<Routes>
				<Route
					path="/"
					element={<AllPosts />}
				/>

				<Route
					path="/collection"
					element={<Collection />}
				/>
				<Route
					path="/edit-post/:id"
					element={<EditPost />}
				/>
				<Route
					path="/new-post"
					element={<NewPost />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/signup"
					element={<Signup />}
				/>
			</Routes>
		</>
	);
}

export default App;
