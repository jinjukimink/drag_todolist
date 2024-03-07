import { Droppable } from "@hello-pangea/dnd";
import DraggleCard from "./DraggleCard";
import styled from "styled-components";
import { useRecoilState } from "recoil";

const Wrapper=styled.div`
  background-color: ${props=>props.theme.boardColor};
  padding:0px 10px;
  padding-top:30px;
  padding-bottom: 10px;
  border-radius: 5px;
  min-height: 30px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
`; 

const Title=styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps{
  isDraggingOver:boolean;
  isDraggingFromWith:boolean;
}
const Area=styled.div<IAreaProps>`
  background-color: ${props=> props.isDraggingOver?"pink":props.isDraggingFromWith?"red":"blue" };
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
`

interface IBoardProps{
    array:string[];//string으로 된 배열이다
    boardId:string;
} 

function Board({array,boardId}:IBoardProps){
    return (
      <>
      <Wrapper>
        <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
            {(magic,snapshot)=> 
            <Area isDraggingOver={snapshot.isDraggingOver} 
            isDraggingFromWith={Boolean(snapshot.draggingFromThisWith)} 
            {...magic.droppableProps} ref={magic.innerRef}> 
              {array.map((toDo,index)=>(
                <DraggleCard index={index} toDo={toDo}/>
              ))
              }
              {magic.placeholder}
              </Area>}
          </Droppable>
      </Wrapper>
      </>
    );
}

export default Board;