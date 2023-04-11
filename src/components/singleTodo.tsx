import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../models'
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import {MdDoneOutline} from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    index:number;
    // Todo model type
    todo:Todo;
    //  array of Todo Model
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo:React.FC<Props> = ({index,todo,todos,setTodos}) => {
    const[edit,setEdit] = useState<boolean>(false);
    const[editTodo,setEditTodo] = useState<string>(todo.todo);

    
    const editRef = useRef<HTMLInputElement>(null);
    // whenever edit changes, it will get fire
    
    useEffect(()=>{
        editRef.current?.focus();
    },[edit]);
    
    const handleDone =(id:number)=>{
        setTodos(todos.map((todo)=>
            todo.id === id? {...todo, isDone:!todo.isDone}:todo
        ))
    }

    const handleDelete = (id:number)=>{
        setTodos(todos.filter((todo)=>todo.id !== id));
    };

    const handleEdit = (e:React.FormEvent, id:number)=>{
        e.preventDefault();
        setTodos(
            todos.map((todo)=>(
            todo.id === id? {...todo,todo:editTodo}:todo
        )));
        setEdit(false); 
    }
    
  return (
    // <Draggable  draggableId={todo.id.toString()} index={index}>
    //     {(provided,snapshot)=>(
    //         <form className={`todosSingle ${snapshot.isDragging ? "drag" : ""}`} 
    //         onSubmit={(e)=>handleEdit(e,todo.id)}
    //         {...provided.draggableProps}
    //         {...provided.dragHandleProps}
    //         ref={provided.innerRef}
    //         >
    <form className='todosSingle' onSubmit={(e)=>handleEdit(e,todo.id)}>
                {
                    edit?(
                        <input 
                        ref = {editRef}
                        className = "todosSingleText" 
                        value = {editTodo} 
                        onChange={(e)=>setEditTodo(e.target.value)}
                        />
                    ):(
                //          if todo is completed,checks it done 

                        todo.isDone?(
                            <s className='todosSingleText'>{todo.todo}</s>
                        ):(
                            // else show normal todo
                            <span className='todosSingleText'>{todo.todo}</span>
                        )
                    )
                }
                <div>
                    <span className='icon' onClick={()=>{
                        //  checks whether both the "edit" state and the "isDone" property are false.
                        if (!edit && !todo.isDone){
                            // setEdit function is called with the inverse of the current value of the edit 
                            // state variable, which will toggle its value from false to true or vice versa. 
                            setEdit(!edit);
                        }
                    }}>
                        <AiOutlineEdit/></span>
                    <span className='icon' onClick={()=>handleDelete(todo.id)}><AiOutlineDelete/></span>
                    <span className='icon' onClick={()=>handleDone(todo.id)}><MdDoneOutline/></span>
                </div>
            </form>
        )}
    // </Draggable>
//   );
// };

export default SingleTodo
