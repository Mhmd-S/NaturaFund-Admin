import React, { useEffect, useRef } from 'react';

type UseModalProps = {
	setShowModal: (value: boolean) => void;
};

const useModal = (setShowModal: UseModalProps) => {
	const modalRef = useRef(null);

	useEffect(() => {
		const modalContainer = modalRef.current;

		const handleClickOutside = (event) => {
			if (modalContainer && !modalContainer.contains(event.target)) {
				setShowModal(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	return {
		modalRef,
	};
};

export default useModal;