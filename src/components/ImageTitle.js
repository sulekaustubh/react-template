import { Typography } from '@material-tailwind/react';

export function ImageTitle({ title, username, titleCSS, image, imageCSS }) {
	return (
		<figure className="relative h-full w-full">
			<div className='overflow-hidden rounded-xl' >
				<img
					className={`${imageCSS} ${'w-full  rounded-xl object-cover object-center'}`}
					// src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
					src={` ${image} `}
					alt="nature image"
				/>
			</div>
			<figcaption className="absolute  bottom-4 left-2/4 flex w-[calc(100%-2rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-2 px-4 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
				<div>
					<p
						className={`${titleCSS} ${'capitalize text-gray-800 font-bold text-4xl'}`}
						// variant="h5"
					>
						{/* Sara Lamalo Sara Lamalo Sara Lamalo Sara Lamalo Sara Lamalo Sara Lamalo Sara Lamalo Sara Lamalo Sara Lamalo Sara Lamalo  */}
						{title}
					</p>
					{/* <p>by {username} </p> */}
					<p>by {username}</p>
					{/* <Typography
						color="gray"
						className="mt-2 font-normal"
					>
						20 July 2022
					</Typography> */}
				</div>
				{/* <Typography
					variant="h5"
					color="blue-gray"
				>
					Growth
				</Typography> */}
			</figcaption>
		</figure>
	);
}
