import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Textarea, Button } from '@material-tailwind/react';

function EditPost() {
	const [blog, setBlog] = useState({});
	const [inputs, setInputs] = useState({});
	const id = useParams().id;
	const navigate = useNavigate();

	// fetch posts by specific user
	const postDetails = async () => {
		try {
			// GET request
			const { data } = await axios.get(
				`https://kaustubh-blog-backend.onrender.com/api/v1/blog/get-blog/${id}`
			);

			// agar edit properly ho jata hai then pop an alert
			if (data?.success) {
				setBlog(data?.blog);
				setInputs({
					title: data?.blog.title,
					description: data?.blog.description,
					image: data?.blog.image,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	// every id change pe re-fetch hoga
	useEffect(() => {
		postDetails();
	}, [id]);

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
			const { data } = await axios.put(
				`https://kaustubh-blog-backend.onrender.com/api/v1/blog/update-blog/${id}`,
				{
					title: inputs.title,
					description: inputs.description,
					image: inputs.image,
					user: id,
				}
			);

			// agar update properly ho jata hai then pop an alert
			if (data?.success) {
				alert('Updates have been saved!');

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

				{/* <div className="text-4xl font-semibold text-gray-600 pt-4 tracking-wider">
					Edit your existing scribbles
				</div> */}
				{/* <div
					className={` border-[3px] border-gray-700 pt-2 h-[450px] bg-cover rounded-3xl bg-url['${inputs.image}']`}
					style={{ backgroundImage: `url('${inputs.image}')` }}
				></div> */}
				<Input
					required
					variant="standard"
					// className="border-[3px] mt-4 tracking-wider border-gray-700 rounded-xl p-2 w-full"
					label="Title"
					name="title"
					value={inputs.title}
					onChange={handleChange}
				/>

				<div className="tracking-widest border-0">
					<Textarea
						required
						rows={20}
						// className="border-[3px] mt-4 tracking-wider border-gray-700 rounded-xl p-2 w-full"
						label="Content"
						name="description"
						value={inputs.description}
						onChange={handleChange}
					/>
				</div>

				<div className="tracking-wider">
					<Input
						required
						variant="standard"
						// className="border-[3px] mt-4 tracking-wider border-gray-700 rounded-xl p-2 w-full"
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
					Save and repost
					</button>
				</div>
					
			</form>
		</div>
	);
}

export default EditPost;
