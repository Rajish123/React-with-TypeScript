import React from 'react'
import './styles.css'
import { Todo } from '../models'
import SingleTodo from './singleTodo';
import { Droppable } from 'react-beautiful-dnd';

// define type
interface Props {
    // array of type Todo
    todos:Todo[];
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>;

}

const TodoList:React.FC<Props> = ({todos,setTodos,completedTodos,setCompletedTodos}) => {
  return (
    <div className='container'>
        {/* <Droppable droppableId='TodosList'>
            {(provided,snapshot)=>(
            <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} 
            ref={provided.innerRef} {...provided.droppableProps}> */}
                <div className='todos'>
                <span className='todosHeading'>Active Task</span>
                {todos?.map((todo,index)=>(
                    // since we are mapping we need to provide key 
                    // we need to send index to singleTodo component because we need to keep track which of this particular
                    // todo is being dragged
                    <SingleTodo 
                    index = {index} 
                    todo = {todo} 
                    key={todo.id} 
                    todos={todos} 
                    setTodos={setTodos} />
                ))}
                {/* {provided.placeholder} */}
            </div>
            {/* )} */}
        {/* </Droppable> */}
        {/* <Droppable droppableId='TodosRemove'>
            {(provided, snapshot)=>(
                <div className={`todos  ${
                    snapshot.isDraggingOver ? "dragcomplete" : "remove"
                  }`}
                 ref={provided.innerRef} 
                 {...provided.droppableProps}>
                    <span className='todosHeading'>Completed Task</span>
                    {completedTodos.map((todo,index)=>(
                        // since we are mapping we need to provide key 
                        <SingleTodo 
                        index={index}
                        todo = {todo} 
                        key={todo.id} 
                        todos={completedTodos} 
                        setTodos={setCompletedTodos} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable> */}
    </div>
  );
};

export default TodoList
