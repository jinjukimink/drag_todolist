import { Draggable } from "@hello-pangea/dnd"
import styled from "styled-components";
import React from "react";

const Card=styled.div`
  border-radius: 5px;
  background-color:${props=>props.theme.cardColor};
  padding:10px 10px;
  margin-top:10px;
  margin-bottom: 10px;
  `;
interface IDraggableCardProps{
    toDo:string;
    index:number;
}

function DraggableCard({toDo,index}:IDraggableCardProps){ 
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
        {(magic)=><Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
        {toDo}</Card>}
        </Draggable> 
    )
}
//카드가 클릭이 되면?배경색이 change

export default React.memo(DraggableCard);
//DraggableCard의 props이 변하지 않으면 렌더링하지 마라.