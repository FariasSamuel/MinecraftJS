import React from 'react'
import './item.css'
import {FaTrash } from 'react-icons/fa';
import {AiOutlineCheckSquare,AiFillCheckSquare} from 'react-icons/ai'
import {deleteTask,doneTask,editTask} from './ToDoFunctions'


export default function ToDoItem({item,state,setState}) {
    const c = (item.done) ? "done" : "notdone"
    return (
        <li className={c}>
            <input className= "EditText" value={item.text} onChange={(e)=>{editTask(e,setState,state,item.id)}}/>
            {console.log(item.date)}
            <span className='date'>{item.date.day}/{item.date.month}/{item.date.year}</span>
            {(item.done)?<AiFillCheckSquare color="green" className='Button' onClick={(e)=>doneTask(setState,state,item.id)}/>:<AiOutlineCheckSquare  className='Button' onClick={(e)=>doneTask(setState,state,item.id)}/>}
            <FaTrash id="trash"  color="red"className='Button' onClick={(e)=>deleteTask(setState,state,item.id)}/>
        </li>
    )
}
