import React,{useRef} from 'react'

const HorizontalSlider = () => {

  const ref = useRef(null)

  console.log(ref)

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  }
    
  return (
    <div className="scroll-main">
      <div className="scroll-container" ref={ref}>
        {/* <button onClick={() => scroll(-50)}>LEFT</button> */}
        <div className="scroll-content2">

        </div>
        <div className="scroll-content">

        </div>
        <div className="scroll-content2">

        </div>
        <div className="scroll-content">

        </div>
        <div className="scroll-content2">

        </div>
        <div className="scroll-content">

        </div>
        <div className="scroll-content2">

        </div>
        <div className="scroll-content">

        </div>
        <div className="scroll-content2">

        </div>
        <div className="scroll-content2">

        </div>
        <div className="scroll-content2">

        </div>
        <div className="scroll-content2">

        </div>
        <button onClick={() => scroll(50)}>RIGHT</button>
      </div>
    </div>
  )
}

export default HorizontalSlider
