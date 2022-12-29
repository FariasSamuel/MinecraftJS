import React, { useState, useEffect, version } from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

import "./fonts/NotoSans-Light.ttf";
import "./fonts/NotoSans-Black.ttf";
import "./fonts/NotoSans-Medium.ttf";
import {FaTrash } from 'react-icons/fa';
import {AiOutlineCheckSquare} from 'react-icons/ai'
import {AiFillCheckSquare} from 'react-icons/ai'

const options = {
	All: 0,
	Done: 1,
	Todo: 2,
}

function loadTask(){
    
    if(localStorage.getItem('state') == null) return {
        value: "",
        list: [],
        currentList: null,
        count: 0,
    }
    else return JSON.parse(localStorage.getItem('state'));
    
}

function loadDate(date){
    date = date.toString();
    return {
        day: date.substring(8, 10),
        month: date.substring(5, 7),
        year: date.substring(0, 4)
    }
}

function addTask(setState, state){  
    ///const a = loadDate(new Date());
    const date = new Date()
    setState((prevProps)=>({
        ...prevProps,
        count: state.count+1,
        list:[...state.list,{text:state.value,id:state.count,done:false,date:loadDate(date.toJSON())}],
    }))
}

function deleteTask(setState,state,id){
    setState((prevProps)=>({
        ...prevProps,
        list: state.list.filter(item => item.id !== id),
    }))
}

function doneTask(setState,state,id){
    
    setState((prevProps)=>({
        ...prevProps,
        list:state.list.map(item =>{
            if(item.id == id){
              //item.done = !item.done;
              console.log(item)
              return {...item,done: !item.done};
            }else{
              return item;
            }
          })
      }))
}

function editTask(event,setState,state,id){   
    setState((prevProps)=>({
        ...prevProps,
        list: state.list.map(item =>{
          if(item.id == id){
            item.text = event.target.value;
            console.log(event.target.value)
            return item;
          }else{
            console.log(event.value)
            return item;
          }
        })
      }))
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
                    const c = (item.done) ? "done" : "notdone"
                    return <li className={c} key = {item.id}>
                        <input className= "EditText" value={item.text} onChange={(e)=>{editTask(e,setState,state,item.id)}}/>
                        {console.log(item.date)}
                        <span className='date'>{item.date.day}/{item.date.month}/{item.date.year}</span>
                        {(item.done)?<AiFillCheckSquare color="green" className='Button' onClick={(e)=>doneTask(setState,state,item.id)}/>:<AiOutlineCheckSquare  className='Button' onClick={(e)=>doneTask(setState,state,item.id)}/>}
                        <FaTrash id="trash"  color="red"className='Button' onClick={(e)=>deleteTask(setState,state,item.id)}/>
                    </li>
                })}

            </ul>
        </div>
    );
}
