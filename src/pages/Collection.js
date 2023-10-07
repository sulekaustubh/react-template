import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SinglePost from '../components/SinglePost';
import CardDefault from '../components/CardDefault';

function Collection() {
	const [posts, setPosts] = useState([]);

	// fetch posts penned by the user
	const myCollection = async () => {
		try {
			// userId grab kiya local storage se
			const id = localStorage.getItem('userId');
			// GET request
			const { data } = await axios.get(
				`https://kaustubh-blog-backend.onrender.com/api/v1/blog/user-blog/${id}`
			);
			if (data?.success) {
				setPosts(data?.userBlog.blogs);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// user ka collection re-fetch hoga on every render
	useEffect(() => {
		myCollection();
	}, []);

	return (
		<div className="border-0 pb-8 border-red-400 h-auto">
			<div className="grid grid-cols-3 gap-7 py-0 my-0 border-0 w-full px-6 border-blue-400">
				{posts && posts.length > 0 ? (
					posts.map((blog) => (
						<CardDefault
							id={blog._id}
							isUser={true}
							title={blog.title}
							description={blog.description}
							image={blog.image}
							username={blog.user.username}
							time={blog.createdAt}
						/>
					))
				) : (
					<div className="h-[90vh] mt-2 flex justify-center items-center">
						<h1 className="italic">Oops.. No scribbles found</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export default Collection;
