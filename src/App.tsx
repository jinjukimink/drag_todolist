
import{DragDropContext, DropResult} from "@hello-pangea/dnd";
import { useRecoilState} from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import { useState } from "react";

const Wrapper=styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin:0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards=styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [array , setArray] = useRecoilState(toDoState);

  const onDragEnd=(info:DropResult)  =>{
    const {destination,draggableId,source} = info;
    console.log(info);

    if(!destination) return;
    if(destination.droppableId===source.droppableId){
        setArray(oldToDos=>{
          const boardCopy=[...oldToDos[destination.droppableId]];
          boardCopy.splice(source.index,1);
          boardCopy.splice(destination?.index, 0,draggableId);
          return {
            ...oldToDos,
            [source.droppableId]:boardCopy,
          };
        })
      }
      else{//보드 간 이동이 있다는 것이지
        //움직인 새끼 삭제.//그 배열은 그대로 렌더링
        //다른 보드로 가서 추가를 해야 하는 것이지
        setArray(prev=>{
           const fromCopy=[...prev[source.droppableId]];
           fromCopy.splice(source.index,1);//삭제
           const toCopy=[...prev[destination.droppableId]];
           toCopy.splice(destination.index,0,draggableId);//추가
           return{
            ...prev,[source.droppableId]:fromCopy, [destination.droppableId]:toCopy,
           }
        })}
}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
        {Object.keys(array).map(id=> <Board key={id} boardId={id} array={array[id]}/>)}
        </Boards>
      </Wrapper>
    </DragDropContext>

  );
}

export default App;
