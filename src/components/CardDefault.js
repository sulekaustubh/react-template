import { Card, CardHeader, CardBody } from '@material-tailwind/react';
import { ReadMore } from './ReadMore';
import { ImageTitle } from './ImageTitle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CardDefault({
	title,
	description,
	image,
	username,
	time,
	id,
	isUser,
}) {
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
		<Card className="py-0 border-0 h-full border-green-400 w-full">
			{/* <div
				color="blue-gray"
				className="relative h-auto"
			>
				<img
					src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
					alt="card-image"
				/>
			</div> */}
			<div>
				<ImageTitle
					imageCSS="h-80 hover:scale-110 duration-500 italic max-h-[350px]"
					title={title}
					username={username}
					image={image}
				/>
			</div>
			<div className="mx-4 my-2">
				{/* <p className="mb-0 capitalize  font-bold text-4xl">{title}</p>
				<p>By {username}</p> */}
				<div className="relative  max-h-24 overflow-clip">
					<div className=" absolute w-full h-full  bg-gradient-to-b from-gray-50/0 to-white"></div>
					{description}
				</div>
			</div>
			<div className="pt-0 flex place-content-between mx-6 pb-4">
				{/* <Button>Read More</Button> */}
				<ReadMore
					title={title}
					description={description}
					username={username}
					image={image}
				/>
				{isUser && (
					<div className='space-x-4 flex font-medium '>
						<button
							onClick={handleEdit}
							className="tracking-wider"
						>
							Edit
						</button>
						<button
							onClick={handleDelete}
							className="tracking-wider"
						>
							Delete
						</button>
					</div>
				)}
			</div>
		</Card>
	);
}
