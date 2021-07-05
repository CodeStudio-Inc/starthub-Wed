// import React, { cloneElement, useRef } from "react"
// import { useDrop} from "react-dnd"


// export const DropWrapper = ({ onDrop, children, type, index, moveItem }) => {
//     const ref = useRef(null)
//     const [{ isOver }, drop] = useDrop({
//         accept: type,
//         hover(item, monitor) {
//             if (!ref.current) { return }
//             const dragIndex = item.index
//             const hoverIndex = index

//             if (dragIndex === hoverIndex) { return }

//             const hoveredRect = ref.current.getBoundingClientRect()
//             const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2
//             const mousePosition = monitor.getClientOffset()
//             const hoverClientY = mousePosition.y - hoveredRect.top

//             if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//                 return;
//             }

//             if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//                 return;
//             }
//             moveItem(dragIndex, hoverIndex);
//             item.index = hoverIndex;
//         },
//         collect: monitor => ({
//             isOver: !!monitor.isOver()
//         }),
//         drop: (item, monitor) => {
//             onDrop(item, monitor)
//         }
//     });

//     return (
//         <div ref={drop} style={{width:"100%"}}>
//             {cloneElement(children, { isOver })}
//         </div>
//     )
// };