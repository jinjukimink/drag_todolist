import {atom,selector}from "recoil";

export const minutesState=atom({
    key:"minutes",
    default:0,
});


export const hourSelector=selector<number>({
    key:"hours",
    get:({get})=>{//get은 아톰값을 가져오게 함.
        const minutes=get(minutesState);
        return minutes/60;
    },
    set:({set},newValue)=>{
        console.log(newValue);
        const minutes = Number(newValue)*60; 
        set(minutesState,minutes)//minutesState를 newValue로 setting한다.
    }
})