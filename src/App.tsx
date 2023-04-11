import React, { useState } from 'react';
import './App.css';
import InputField from './components/inputField';
import TodoList from './components/todoList';
import { Todo } from './models';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

// types in typescript
// recommended to give type to each and every variable
// can contain any value
// let anything:any; // not recommend

// dont know which type its going to be
let anything: unknown; // recommend instead of any

let name:string;

// let age:number;
// contain number or string
let age: number | string;

let isStudent:boolean;

//contain array of strings
let hobbies : string[];
//contain array of numbers
let num : number[];

//tuple contains fixed amount of value and types defined during declaration
// contain 1 number and 1 string
let roles: [number,string];

//define object: two ways to define object
// let person = Object; // not recommended because object can have lot of properties inside it
//  type is smthg called alais.Alias are of two types:1.Type 2.Interface 
// type Person = {
//   name:string;
//   // optional property
//   age?:number;
// }
// let person:Person = {
//   name:"Rajish"
// }

interface Person {
  name:string;
}

// contain an array of Person object
let lotsOfPerson: Person[];

//define function
// function printName(name:string){
//   console.log(name);
// }
// printName("rajish");

//declare function type
// two ways:
// let printName:Function;
// let printName:(name:string) => returnType;

// if nothing is returned, void returns undefined
// let printName:(name:string) => void;

// if we dont know what it's gonna return, never doesnot return anything  
let printName:(name:string) => never;

// extending type
type x = {
  a:string;
  b:number;
};
type y = {
  c: string;
  d: number;
};
// use properties of type x inside another type
// here z contains all properties of x as well as z
type z = x & {
  e:string;
  f:number;
};

let Z : z={
  a:"Rajish",
  b:7,
  e:"Maharjan",
  f:8
};

//extending interface
interface P {
  name:string;
  age:number;
};

interface Q extends P {
  profession:string;
}

// extending interface inside type
interface A {
  age:number;
}
type B = A & {
  name:string;
}

// extending type inside interface
type C = {
  name:string;
}

interface D extends C {
  age:number;
}

// define type of this component , we want the type to be functional component
const App:React.FC = () => {
  const[todo,setTodo] = useState<string>("");
  // if you want to accept multiple type of value
  // const[todo,setTodo] = useState<string | number>("")
  // its type is going to be an array of Todo interface
  const [todos,setTodos] = useState<Todo[]>([]);
  const [completedTodos,setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      // take whatever inside todos and add another todo
      setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}]);
      setTodo("");

    }
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    // <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>Taskify</span>
        <InputField todo = {todo} setTodo = {setTodo} handleAdd = {handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos = {completedTodos} setCompletedTodos = {setCompletedTodos} />
      </div>
    // </DragDropContext>
  );
}

export default App;
