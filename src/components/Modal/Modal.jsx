import React from "react";
import { Transition } from "react-transition-group";

import "./Modal.scss";

const duration = 300;

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0
};

const transitionStyle = {
	entering: { opacity: 1 },
	entered: { opacity: 1 },
	exiting: { opacity: 0 },
	exited: { opacity: 0 }
};

const Modal = ({ isOpen, setIsOpen, children }) => (
	<Transition in={isOpen} timeout={500} enter={false} exit={false}>
		{state => {
			console.log(state);
			return (
				<div style={{ ...defaultStyle, ...transitionStyle[state] }}>
					I'm fade Transition !
				</div>
			);
		}}
	</Transition>
);

export default Modal;
