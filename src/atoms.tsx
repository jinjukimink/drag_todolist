import {atom,selector} from "recoil";

interface IToDoState{
    [key:string]:string[]//스프링으로 key가 이루어져 있고 이는 스트링 배열이라고
}

export const toDoState=atom<IToDoState>({//지금 toDoState는 세가지 배열을 품은 객체이다.
    key:"toDo",
    default:{
        ToDo: ["a","c","d"],
        Doing:["e","f"],
        Done:["b"],
    },
}); 