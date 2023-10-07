import React from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import { ImageTitle } from './ImageTitle';

export function ReadMore({ title, description, username, image }) {
	const [size, setSize] = React.useState(null);

	const handleOpen = (value) => setSize(value);

	const formatAnswer = (answer) => {
		return answer.split('\n').map((line, index) => (
			<React.Fragment key={index}>
				{line}
				<br />
			</React.Fragment>
		));
	};

	return (
		<div className="">
			{/* <div className="mb-3 flex gap-3">
        <Button onClick={() => handleOpen("xs")} variant="gradient">
          Open Dialog XS
        </Button>
        <Button onClick={() => handleOpen("sm")} variant="gradient">
          Open Dialog SM
        </Button>
        <Button onClick={() => handleOpen("md")} variant="gradient">
          Open Dialog MD
        </Button>
      </div> */}
			{/* <div className="flex gap-3">
        <Button onClick={() => handleOpen("lg")} variant="gradient">
          Open Dialog LG
        </Button>
        <Button onClick={() => handleOpen("xl")} variant="gradient">
          Open Dialog XL
        </Button>
    </div> */}
			<Button
				onClick={() => handleOpen('xxl')}
				// variant="gradient"
			>
				Read More
			</Button>
			<Dialog
				className="bg-white/70 border-0 pt-14 border-red-500 overflow-scroll backdrop-blur-lg px-24"
				open={
					size === 'xs' ||
					size === 'sm' ||
					size === 'md' ||
					size === 'lg' ||
					size === 'xl' ||
					size === 'xxl'
				}
				size={size || 'md'}
				handler={handleOpen}
			>
				<div>
					<ImageTitle
						imageCSS="h-[600px] "
						titleCSS="font-black text-8xl text-gray-900"
						title={title}
						username={username}
						image={image}
					/>
				</div>
				{/* <p className="capitalize text-gray-900 font-black text-9xl border border-green-300">
					{title}
				</p> */}
				<p className="font-semibold mt-4 tracking-wider text-2xl text-gray-800">
					{formatAnswer(description)}
				</p>
				<DialogFooter>
					{/* <Button
						variant="text"
						color="red"
						onClick={() => handleOpen(null)}
						className="mr-1"
					>
						<span>Cancel</span>
					</Button> */}
					<Button
						className="tracking-widest"
						variant="gradient"
						color="black"
						onClick={() => handleOpen(null)}
					>
						<span>Close</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</div>
	);
}
