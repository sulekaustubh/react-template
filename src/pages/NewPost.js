import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Textarea, Button } from '@material-tailwind/react';

const NewPost = () => {
	// userId grab kiya local storage se
	const id = localStorage.getItem('userId');
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		title: '',
		description: '',
		image: '',
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
				`https://kaustubh-blog-backend.onrender.com/api/v1/blog/create-blog`,
				{
					title: inputs.title,
					description: inputs.description,
					image: inputs.image,
					user: id,
				}
			);
			// agar post creation properly ho jata hai then pop an alert
			if (data?.success) {
				alert('Your Scribble is now live!');
				navigate('/collection');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="px-80">
			<form onSubmit={handleSubmit}>
				<div className="space-y-10">
					{/* <div className="text-4xl font-semibold  text-gray-600 pt-0 tracking-wider">
						Add new post
					</div> */}
					<Input
						required
						variant="standard"
						label="Title"
						name="title"
						value={inputs.title}
						onChange={handleChange}
					/>
					{/* <Input
					required
					variant="static"
					className="mt-4 tracking-wider p-2 w-full"
					placeholder="Title.."
					name="title"
					value={inputs.title}
					onChange={handleChange}
				/> */}
					<div className="tracking-widest border-0">
						<Textarea
							required
							label="Content*"
							name="description"
							rows={20}
							value={inputs.description}
							onChange={handleChange}
						/>
					</div>
					{/* <textarea
					rows={14}
					required
					className="border-[3px] mt-4 tracking-wider border-gray-700 rounded-xl p-2 w-full"
					placeholder="Content.."
					name="description"
					value={inputs.description}
					onChange={handleChange}
				/> */}
					<div className="tracking-wider">
						<Input
							required
							variant="standard"
							// label="Title"
							label="Paste the URL to your image here"
							name="image"
							value={inputs.image}
							onChange={handleChange}
						/>
					</div>

					<button
						type="submit"
						className="rounded-full py-2 tracking-widest px-4 hover:bg-blue-600 border-[0px] border-gray-800 duration-200 bg-blue-500 text-gray-50 "
					>
						Publish
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewPost;
