import React, { useRef } from 'react';

const HorizontalSlider = () => {
	const ref = useRef(null);

	console.log(ref);

	const scroll = (scrollOffset) => {
		ref.current.scrollLeft += scrollOffset;
	};

	return (
		<div className="scroll-main">
			<div className="scroll-container" ref={ref}>
				{/* <button onClick={() => scroll(-50)}>LEFT</button> */}
				<div className="scroll-content2" />
				<div className="scroll-content" />
				<div className="scroll-content2" />
				<div className="scroll-content" />
				<div className="scroll-content2" />
				<div className="scroll-content" />
				<div className="scroll-content2" />
				<div className="scroll-content" />
				<div className="scroll-content2" />
				<div className="scroll-content2" />
				<div className="scroll-content2" />
				<div className="scroll-content2" />
				<button onClick={() => scroll(50)}>RIGHT</button>
			</div>
		</div>
	);
};

export default HorizontalSlider;
