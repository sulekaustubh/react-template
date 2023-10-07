import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
// import CardDefault from '../components/CardDefault';
const LazyCard = React.lazy(() => import('../components/CardDefault'));
const AllPosts = () => {
	const [blogs, setBlogs] = useState([]);

	// fetch posts by all users
	const getAllBlogs = async () => {
		try {
			// GET request
			const { data } = await axios.get(
				`https://kaustubh-blog-backend.onrender.com/api/v1/blog/all-blog`
			);
			if (data?.success) {
				setBlogs(data?.blogs);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// all posts re-fetch hogi on every render
	useEffect(() => {
		getAllBlogs();
	}, []);

	return (
		<div className="border-0 pb-8 border-red-400 h-auto">
			<div className="grid grid-cols-3 gap-7 py-0 my-0 border-0 w-full px-6 border-blue-400">
				<Suspense fallback={<p>loading..</p>}>
					{blogs &&
						blogs.map((blog) => (
							<LazyCard
								id={blog?._id}
								isUser={
									localStorage.getItem('userId') ===
									blog?.user?._id
								}
								title={blog?.title}
								description={blog?.description}
								image={blog?.image}
								username={blog?.user?.username}
								time={blog.createdAt}
							/>
						))}
				</Suspense>
			</div>
		</div>
	);
};

export default AllPosts;
