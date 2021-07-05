// import React from "react"
// import { useDrag } from "react-dnd"



// export const DragWrapper = ({ moveItem, children, type, item }) => {
//     const [{ isDragging }, drag] = useDrag(() => ({
//         type: type,
//         item:item
//     }));
//     return (
//         <div
//             ref={drag}
//             style={{ opacity: isDragging ? 0 : 1, width:"100%" }}
//         >
//             {children}
//         </div>
//     )
// };