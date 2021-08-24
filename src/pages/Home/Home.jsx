import React, { useState } from "react";
import { Modal } from "components";

const Home = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className='home' onClick={() => setOpen(true)}>
				Home Page
			</div>
			<Modal>Modal</Modal>
		</>
	);
};

export default Home;
