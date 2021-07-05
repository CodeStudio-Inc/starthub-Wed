import React,{useSelector} from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "./types";
import { statuses } from "./data";

const DropWrapper = ({ onDrop, children, listId, lists }) => {


    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        canDrop: (item, monitor) => {
            const itemIndex = lists.findIndex(si => si._id === item._listId);
            const statusIndex = lists.findIndex(si => si._id === listId);
            return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, listId);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} >
            {React.cloneElement(children, { isOver })}
        </div>
    )
};

export default DropWrapper;