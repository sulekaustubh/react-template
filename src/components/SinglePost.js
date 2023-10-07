import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// this component re-renders for every post
function SinglePost({ title, description, image, username, time, id, isUser }) {
	const navigate = useNavigate();

	// yeh call hoga when edit button is clicked
	const handleEdit = () => {
		navigate(`/edit-post/${id}`);
	};

	// yeh call hoga when delete button is clicked
	const handleDelete = async () => {
		try {
			// DELETE request
			const { data } = await axios.delete(
				`https://kaustubh-blog-backend.onrender.com/api/v1/blog/delete-blog/${id}`
			);

			// agar delete properly ho jata hai then pop an alert
			if (data?.success) {
				alert('Post deleted! Redirecting to Home.');
				navigate(`/`, { replace: true });
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="pt-6 border-b-4 mx-12">
			<div className="text-4xl pb-4 font-semibold text-gray-700 tracking-wider">
				{title
					.split('')
					.map((char) => char.toUpperCase())
					.join('')}
			</div>

			<div className="flex mb-4 space-x-8">
				<div className=" pt-1 w-1/2">
					<div
						className={` border-[3px] border-gray-700 pt-2 h-[450px] bg-cover rounded-3xl bg-url['${image}']`}
						style={{ backgroundImage: `url('${image}')` }}
					></div>
					<div className="text-[20px] flex font-semibold tracking-wider pt-2 text-gray-600">
						<div>By {username}</div>
					</div>
					<div className="italic text-[12px] flex place-content-between text-gray-700 font-semibold tracking-widest">
						<div className="pt-[2px]">{time.slice(0, 10)}</div>
						<div>
							{isUser && (
								<div className="space-x-6 italic tracking-wider text-sm">
									<button
										className="space-x-4 italic tracking-widest text-sm"
										onClick={handleEdit}
									>
										Edit
									</button>
									<button
										className="space-x-4 italic tracking-widest text-sm"
										onClick={handleDelete}
									>
										Delete
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className=" text-gray-800 tracking-wider w-1/2 px-4">
					{' '}
					{description}
				</div>
			</div>
		</div>
	);
}

export default SinglePost;
