import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import useModal from './hooks/useModal';

const Modal = ({ showModal, setShowModal, children }) => {
	const { modalRef } = useModal(setShowModal);

	return (
		<div
			className="absolute w-screen h-screen top-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.13)] overflow-hidden z-30"
		>
			<FontAwesomeIcon
				icon={faClose}
				className="absolute top-0 right-0 text-2xl text-white m-2 cursor-pointer"
				onClick={() => setShowModal(false)}
			/>
			<div
				ref={modalRef}
				className={`bg-white rounded-lg w-4/5 h-2/5 md:w-4/12 md:h-3/5 py-2 px-5 flex flex-col items-center justify-evenly transition-all duration-300`}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;