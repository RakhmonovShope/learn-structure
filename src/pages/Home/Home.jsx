import React, { useState } from "react";
import { Modal } from "components";

const Home = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className='home' onClick={() => setOpen(!open)}>
				Home Page
			</div>
			<Modal isOpen={open}>Modal</Modal>
		</>
	);
};

export default Home;
