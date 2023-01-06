import React, { useState, useEffect, version } from 'react';
import ToDoItem from './ToDoItem';
import "./fonts/NotoSans-Light.ttf";
import "./fonts/NotoSans-Black.ttf";
import "./fonts/NotoSans-Medium.ttf";

import {deleteTask,doneTask,editTask,addTask,loadTask,loadDate} from './ToDoFunctions'
import './App.css'

const options = {
	All: 0,
	Done: 1,
	Todo: 2,
}

function switchList (setState,state,option) {
    var lista = "";
    
    switch (option){
        case 0:
            console.log(state)
            lista = undefined;
            break;
        case 1:
            lista = false;
            break;
        case 2:
            lista = true;
            break;
    }
    console.log(lista);
    setState((prevProps)=>({
        ...prevProps,
        currentList: lista
    }))
}

export default function ToDo(props) {
    const [state, setState] = useState(loadTask);
    

    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state));
    }, [state]);

    const handleChange = (event)=> {
        const { name, value } = event.target;
        setState((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addTask(setState,state)
    };

    
    return (
        <div className='Container'>
            <h1>TodoInput</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="New Todo" type="text" name="value" value={state.value} onChange={handleChange} />
                <input type="submit" value="Add new task" />
            </form>
            <h1>TodoList</h1>
            <div className='buttons'>
                <button onClick={()=>switchList(setState,state,options.All)}>All</button>
                <button onClick={()=>switchList(setState,state,options.Done)}>Done</button>
                <button onClick={()=>switchList(setState,state,options.Todo)}>Todo</button>
            </div>
            
            <ul>
                {state.list.filter(item=> item.done !== state.currentList).map((item) => {
                    return <ToDoItem key = {item.id}  item={item} setState={setState} state={state} />
                })}

            </ul>
        </div>
    );
}
