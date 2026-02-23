import { useEffect, useRef } from "react";

const useAutoInputFocus = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFocus = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	useEffect(() => {
		handleFocus();
	}, []);

	return inputRef;
};

export default useAutoInputFocus;
